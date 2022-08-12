import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentManualController } from '@app/equipment/equipment-manual/equipment-manual.controller';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { Manual } from '@domain/equipment/entities/manual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manual])],
  controllers: [EquipmentManualController],
  providers: [EquipmentManualService],
  exports: [],
})
export class EquipmentManualModule {}
