import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GymNoticeModule } from '@app/gym/gym-notice/gym-notice.module';
import { GymController } from '@app/gym/gym.controller';
import { GymService } from '@app/gym/gym.service';
import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { Gym } from '@domain/gym/entities/gym.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gym, GymUser]), GymNoticeModule],
  providers: [GymService],
  controllers: [GymController],
  exports: [GymService],
})
export class GymModule {}
