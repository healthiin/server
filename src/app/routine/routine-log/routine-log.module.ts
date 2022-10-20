import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@app/auth/authorization/authorization.module';
import { RoutineCoreModule } from '@app/routine/routine-core/routine-core.module';
import { RoutineLogController } from '@app/routine/routine-log/routine-log.controller';
import { RoutineLogService } from '@app/routine/routine-log/routine-log.service';
import { RoutineManualModule } from '@app/routine/routine-manual/routine-manual.module';
import { RoutineLog } from '@domain/routine/routine-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutineLog]),
    RoutineCoreModule,
    RoutineManualModule,
    AuthorizationModule,
  ],
  controllers: [RoutineLogController],
  providers: [RoutineLogService],
  exports: [RoutineLogService],
})
export class RoutineLogModule {}
