import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentManualController } from '@app/equipment/equipment-manual/equipment-manual.controller';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { Manual } from '@domain/equipment/entities/equipment-manual.entity';
import { Equipment } from '@domain/equipment/entities/equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manual, Equipment])],
  controllers: [EquipmentManualController],
  providers: [EquipmentManualService],
  exports: [],
})
export class EquipmentManualModule {}
