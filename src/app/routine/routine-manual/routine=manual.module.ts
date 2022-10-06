import { Module } from '@nestjs/common';

import { RoutineManualController } from '@app/routine/routine-manual/routine-manual.controller';
import { RoutineManualService } from '@app/routine/routine-manual/routine-manual.service';

@Module({
  controllers: [RoutineManualController],
  providers: [RoutineManualService],
})
export class RoutineManualModule {}
