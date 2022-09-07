import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthenticatedUserData } from '@app/auth/authentication/commands/authenticated-user.data';
import { UserService } from '@app/user/user.service';
import { NeedAuthenticationException } from '@domain/errors/auth.errors';
import {
  JwtDecodedData,
  JwtSubjectType,
} from '@infrastructure/types/jwt.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('APP_SECRET', ''),
      ignoreExpiration: false,
    });
  }

  async validate(data: JwtDecodedData): Promise<AuthenticatedUserData> {
    if (data.sub !== JwtSubjectType.ACCESS) {
      throw new NeedAuthenticationException();
    }

    return this.userService.getUserForAuthentication(data.user_id);
  }
}
