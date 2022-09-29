import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import axios from 'axios';

import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from '../../../constants';

import { LoginRequest } from '@app/auth/authentication/commands/login.request';
import { KakaoUserProfileRequest } from '@app/auth/authentication/dtos/kakao-user-profile.request';
import { TokenResponse } from '@app/auth/authentication/dtos/token.response';
import { UserKakaoResponse } from '@app/auth/authentication/dtos/user-kakao.response';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { UserService } from '@app/user/user.service';
import {
  InvalidTokenException,
  KakaOAuthTimeoutException,
  KakaoOAuthFailedException,
  UnSupportedVendorTypeException,
} from '@domain/errors/auth.errors';
import { User } from '@domain/user/user.entity';
import {
  JwtDecodedData,
  JwtSubjectType,
} from '@infrastructure/types/jwt.types';
import { Request } from '@infrastructure/types/request.types';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginRequest, res): Promise<TokenResponse> {
    const user = await this.oAuthLogin(data);
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user.id),
      this.generateRefreshToken(user.id),
    ]);

    res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
    });

    return new TokenResponse({ accessToken, isFreshman: user.isFreshman });
  }

  async getUserByKakaoAccessToken(
    accessToken: string,
  ): Promise<{ id: string; isFreshman: boolean }> {
    axios.defaults.timeout = 1000;

    const axiosData = axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .catch((error) => {
        if (error.code === 503) {
          throw new KakaOAuthTimeoutException();
        }
        throw new KakaoOAuthFailedException();
      });
    const { data: userData } = axiosData;

    if (!userData) throw new KakaoOAuthFailedException();

    const user = await this.userService.findByUsername('kakao:' + userData.id);
    if (!user) {
      const newUser = await this.transformKakaoDataToUser(userData);
      const createdUser = await this.userService.createUser(newUser);
      return { id: createdUser.getUserId, isFreshman: createdUser.isFreshman };
    }

    return { id: user.id, isFreshman: false };
  }

  async transformKakaoDataToUser(
    user: KakaoUserProfileRequest,
  ): Promise<UserKakaoResponse> {
    return new UserKakaoResponse({
      username: 'kakao:' + user.id,
      userEmail: user.kakao_account.email,
      gender: user.kakao_account.gender,
      ageRange: user.kakao_account.age_range,
    });
  }

  async oAuthLogin(
    data: LoginRequest,
  ): Promise<{ id: string; isFreshman: boolean }> {
    let id;
    let isFreshman;
    switch (data.vendor) {
      case 'kakao': {
        const user = await this.getUserByKakaoAccessToken(data.accessToken);
        id = user.id;
        isFreshman = user.isFreshman;
        break;
      }
      default: {
        throw new UnSupportedVendorTypeException();
      }
    }
    return { id, isFreshman };
  }

  async refresh(req: Request): Promise<TokenResponse> {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) throw new UnauthorizedException();

    const token = <JwtDecodedData>this.jwtService.decode(refreshToken);

    if (!token || token.sub !== JwtSubjectType.REFRESH) {
      throw new InvalidTokenException();
    }

    const account = await this.userService.findById(token.user_id);
    const accessToken = await this.generateAccessToken(account.id);

    return new TokenResponse({ accessToken });
  }

  async logout(req: Request, res): Promise<boolean> {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) throw new UnauthorizedException();

    res.clearCookie('refresh_token', {
      path: '/auth',
      httpOnly: true,
    });

    return true;
  }

  async getMyProfile(user: User): Promise<UserProfileResponse> {
    return new UserProfileResponse(user);
  }

  protected async isValidPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const secret = Buffer.from(this.configService.get<string>('APP_SECRET'));
    return argon2.verify(hashedPassword, password, { secret });
  }

  protected async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { user_id: userId },
      {
        expiresIn: ACCESS_TOKEN_EXPIRE,
        subject: JwtSubjectType.ACCESS,
      },
    );
  }

  protected async generateRefreshToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { user_id: userId },
      {
        expiresIn: REFRESH_TOKEN_EXPIRE,
        subject: JwtSubjectType.REFRESH,
      },
    );
  }
}
