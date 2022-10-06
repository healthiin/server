import { Module } from '@nestjs/common';

import { RoutineCoreModule } from '@app/routine/routine-core/routine-core.module';
import { RoutineManualModule } from '@app/routine/routine-manual/routine=manual.module';

@Module({ imports: [RoutineCoreModule, RoutineManualModule] })
export class RoutineModule {}
