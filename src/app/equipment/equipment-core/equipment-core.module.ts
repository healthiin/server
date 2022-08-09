import { Module } from '@nestjs/common';

import { EquipmentCoreController } from '@app/equipment/equipment-core/equipment-core.controller';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';

@Module({
  imports: [],
  providers: [EquipmentCoreService],
  controllers: [EquipmentCoreController],
})
export class EquipmentCoreModule {}
