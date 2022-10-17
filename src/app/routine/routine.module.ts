import { Module } from '@nestjs/common';

import { RoutineCoreModule } from '@app/routine/routine-core/routine-core.module';
import { RoutineLogModule } from '@app/routine/routine-log/routine-log.module';
import { RoutineManualModule } from '@app/routine/routine-manual/routine-manual.module';

@Module({ imports: [RoutineCoreModule, RoutineManualModule, RoutineLogModule] })
export class RoutineModule {}
