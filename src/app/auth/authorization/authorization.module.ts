import { Module } from '@nestjs/common';

import { PermissionFactory } from '@app/auth/authorization/permission.factory';

@Module({
  providers: [PermissionFactory],
  exports: [PermissionFactory],
})
export class AuthorizationModule {}
