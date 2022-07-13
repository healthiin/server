import { Module } from '@nestjs/common';

import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
