import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@app/auth/authorization/authorization.module';
import { RoutineController } from '@app/routine/routine.controller';
import { RoutineService } from '@app/routine/routine.service';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { Routine } from '@domain/routine/routine.entity';
import { User } from '@domain/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine, User, Manual]),
    AuthorizationModule,
  ],
  controllers: [RoutineController],
  providers: [RoutineService],
})
export class RoutineModule {}
