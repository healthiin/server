import { Module } from '@nestjs/common';

import { AuthModule } from '@app/auth/auth.module';
import { CommunityModule } from '@app/community/community.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [AuthModule, UserModule, CommunityModule],
})
export class AppModule {}
