import { Module } from '@nestjs/common';

import { GymCoreModule } from '@app/gym/gym-core/gym-core.module';
import { GymNoticeModule } from '@app/gym/gym-notice/gym-notice.module';

@Module({
  imports: [GymCoreModule, GymNoticeModule],
})
export class GymModule {}
