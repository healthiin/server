import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import axios from 'axios';

import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from '../../../constants';

import { LoginRequest } from '@app/auth/authentication/commands/login.request';
import { TokenResponse } from '@app/auth/authentication/dtos/token.response';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { UserService } from '@app/user/user.service';
import {
  GoogleOAuthFailedException,
  InvalidTokenException,
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
    let userId;
    switch (data.vendor) {
      case 'kakao': {
        userId = await this.getUserIdByKakaoAccessToken(data.accessToken);
        break;
      }
      case 'google': {
        userId = await this.getUserIdByGoogleAccessToken(
          data.accessToken,
          data.payload,
        );
        break;
      }
      default: {
        throw new UnSupportedVendorTypeException();
      }
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(userId),
      this.generateRefreshToken(userId),
    ]);

    res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
    });

    return new TokenResponse({ accessToken });
  }

  async getUserIdByKakaoAccessToken(accessToken: string): Promise<string> {
    const user = await axios.get('kapi.kakaox.com/v2/user/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!user) throw new KakaoOAuthFailedException();

    const userId = await this.userService.findById(user.data.id);
    if (!userId) return this.userService.createUser(user.data);

    return userId.id;
  }

  async getUserIdByGoogleAccessToken(
    accessToken: string,
    payload: any,
  ): Promise<string> {
    const googleAPI = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`;
    const userInfo = await axios.get(googleAPI, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    if (!userInfo) throw new GoogleOAuthFailedException();

    const user = await this.userService.findByEmail(payload.email);
    const userId = await this.userService.findById(user.id);
    if (!userId) {
      return await this.userService.createUser({
        email: payload.email,
        name: payload.name,
        username: 'google',
        nickname: 'test',
      });
    }
    return user.id;
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
