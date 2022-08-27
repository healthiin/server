import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@app/auth/authorization/authorization.module';
import { GymCoreController } from '@app/gym/gym-core/gym-core.controller';
import { GymCoreService } from '@app/gym/gym-core/gym-core.service';
import { Gym } from '@domain/gym/entities/gym.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gym]), AuthorizationModule],
  providers: [GymCoreService],
  controllers: [GymCoreController],
  exports: [GymCoreService],
})
export class GymCoreModule {}
