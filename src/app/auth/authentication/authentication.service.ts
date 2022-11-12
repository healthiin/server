import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } from '../../../constants';

import { LoginRequest } from '@app/auth/authentication/commands/login.request';
import { NativeLoginRequest } from '@app/auth/authentication/dtos/native-login.request';
import { TokenResponse } from '@app/auth/authentication/dtos/token.response';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { UserService } from '@app/user/user.service';
import {
  InvalidPassword,
  InvalidTokenException,
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
    private readonly httpService: HttpService,
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

  async nativeLogin(data: NativeLoginRequest, res): Promise<TokenResponse> {
    const user = await this.userService.findByUsername(data.username);
    console.log(
      data.password,
      await this.userService.hashPassword(data.password),
    );

    const logined = await this.isValidPassword(data.password, user.password);
    if (!logined) {
      throw new InvalidPassword();
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user.id),
      this.generateRefreshToken(user.id),
    ]);

    res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
    });

    return new TokenResponse({ accessToken });
  }

  async loginByUserId(userId: string, res): Promise<TokenResponse> {
    const user = await this.userService.findById(userId);
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user.id),
      this.generateRefreshToken(user.id),
    ]);

    res.cookie('refresh_token', refreshToken, {
      path: '/auth',
      httpOnly: true,
    });

    return new TokenResponse({ accessToken });
  }

  async getUserByKakaoAccessToken(
    accessToken: string,
  ): Promise<{ id: string; isFreshman: boolean }> {
    const oAuthLoginData = await this.httpService.axiosRef.get(
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    const user = await this.userService.findByUsername(oAuthLoginData.data.id);
    if (!user) {
      const createdUser = await this.userService.createUser({
        username: oAuthLoginData.data.id,
      });
      return { id: createdUser.getUserId, isFreshman: createdUser.isFreshman };
    }

    return { id: user.id, isFreshman: false };
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
