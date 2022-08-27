import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@app/auth/authorization/authorization.module';
import { GymNoticeController } from '@app/gym/gym-notice/gym-notice.controller';
import { GymNoticeService } from '@app/gym/gym-notice/gym-notice.service';
import { GymNotice } from '@domain/gym/entities/gym-notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GymNotice]), AuthorizationModule],
  providers: [GymNoticeService],
  controllers: [GymNoticeController],
  exports: [GymNoticeService],
})
export class GymNoticeModule {}
