import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@app/auth/authorization/authorization.module';
import { RoutineCoreController } from '@app/routine/routine-core/routine-core.controller';
import { RoutineCoreService } from '@app/routine/routine-core/routine-core.service';
import { RoutineManualModule } from '@app/routine/routine-manual/routine-manual.module';
import { UserModule } from '@app/user/user.module';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { Routine } from '@domain/routine/routine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine, Manual, RoutineManual]),
    AuthorizationModule,
    UserModule,
    RoutineManualModule,
  ],
  controllers: [RoutineCoreController],
  providers: [RoutineCoreService],
  exports: [RoutineCoreService],
})
export class RoutineCoreModule {}
