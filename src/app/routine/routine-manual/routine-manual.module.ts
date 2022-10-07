import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentManualModule } from '@app/equipment/equipment-manual/equipment-manual.module';
import { RoutineManualController } from '@app/routine/routine-manual/routine-manual.controller';
import { RoutineManualService } from '@app/routine/routine-manual/routine-manual.service';
import { RoutineManual } from '@domain/routine/routine-manual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoutineManual]), EquipmentManualModule],
  controllers: [RoutineManualController],
  providers: [RoutineManualService],
})
export class RoutineManualModule {}
