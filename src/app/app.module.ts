import { Module } from '@nestjs/common';

import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
