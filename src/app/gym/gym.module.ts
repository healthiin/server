import { Module } from '@nestjs/common';

import { GymCoreModule } from '@app/gym/gym-core/gym-core.module';
import { GymNoticeModule } from '@app/gym/gym-notice/gym-notice.module';
import { GymUserModule } from '@app/gym/gym-user/gym-user.module';

@Module({
  imports: [GymCoreModule, GymNoticeModule, GymUserModule],
})
export class GymModule {}
