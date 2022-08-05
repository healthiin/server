import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GymCoreController } from '@app/gym/gym-core/gym-core.controller';
import { GymCoreService } from '@app/gym/gym-core/gym-core.service';
import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { Gym } from '@domain/gym/entities/gym.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gym, GymUser])],
  providers: [GymCoreService],
  controllers: [GymCoreController],
  exports: [GymCoreService],
})
export class GymCoreModule {}
