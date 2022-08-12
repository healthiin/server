import { Module } from '@nestjs/common';

import { EquipmentManualController } from '@app/equipment/equipment-manual/equipment-manual.controller';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';

@Module({
  imports: [],
  controllers: [EquipmentManualController],
  providers: [EquipmentManualService],
  exports: [],
})
export class EquipmentManualModule {}
