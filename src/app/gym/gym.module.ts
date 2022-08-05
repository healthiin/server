import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GymController } from '@app/gym/gym.controller';
import { GymService } from '@app/gym/gym.service';
import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { Gym } from '@domain/gym/entities/gym.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gym, GymUser])],
  providers: [GymService],
  controllers: [GymController],
  exports: [GymService],
})
export class GymModule {}
