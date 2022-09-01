import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoutineController } from '@app/routine/routine.controller';
import { RoutineService } from '@app/routine/routine.service';
import { Routine } from '@domain/routine/routine.entity';
import { User } from '@domain/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Routine, User])],
  controllers: [RoutineController],
  providers: [RoutineService],
})
export class RoutineModule {}
