import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GymUserController } from '@app/gym/gym-user/gym-user.controller';
import { GymUserService } from '@app/gym/gym-user/gym-user.service';
import { GymCreatedListener } from '@app/gym/gym-user/listeners/gym-created.listener';
import { GymDeletedListener } from '@app/gym/gym-user/listeners/gym-deleted.listener';
import { GymUser } from '@domain/gym/entities/gym-user.entity';

const Listeners = [GymCreatedListener, GymDeletedListener];

@Module({
  imports: [TypeOrmModule.forFeature([GymUser])],
  controllers: [GymUserController],
  providers: [GymUserService, ...Listeners],
  exports: [GymUserService],
})
export class GymUserModule {}
