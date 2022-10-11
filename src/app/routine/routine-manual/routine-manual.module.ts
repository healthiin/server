import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentManualModule } from '@app/equipment/equipment-manual/equipment-manual.module';
import { RoutineManualController } from '@app/routine/routine-manual/routine-manual.controller';
import { RoutineManualService } from '@app/routine/routine-manual/routine-manual.service';
import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { Routine } from '@domain/routine/routine.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutineManual, Routine]),
    EquipmentManualModule,
  ],
  controllers: [RoutineManualController],
  providers: [RoutineManualService],
  exports: [RoutineManualService],
})
export class RoutineManualModule {}
