import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationController } from '@app/auth/authentication/authentication.controller';
import { AuthenticationService } from '@app/auth/authentication/authentication.service';
import { JwtStrategy } from '@app/auth/authentication/jwt.strategy';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const issuer = configService.get<string>(
          'APP_URL',
          'https://api.be-healthy.life',
        );
        return {
          secret: configService.get<string>('APP_SECRET', ''),
          verifyOptions: { issuer },
          signOptions: { issuer, notBefore: 0 },
        };
      },
    }),
    UserModule,
    HttpModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy],
})
export class AuthenticationModule {}
