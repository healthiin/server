import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@app/auth/authentication/authentication.module';
import { AuthorizationModule } from '@app/auth/authorization/authorization.module';

@Module({
  imports: [AuthenticationModule, AuthorizationModule],
})
export class AuthModule {}
