import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentManualController } from '@app/equipment/equipment-manual/equipment-manual.controller';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { EquipmentManual } from '@domain/equipment/entities/equipment-manual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentManual])],
  controllers: [EquipmentManualController],
  providers: [EquipmentManualService],
  exports: [EquipmentManualService],
})
export class EquipmentManualModule {}
