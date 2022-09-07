import { Module } from '@nestjs/common';

import { EquipmentCoreModule } from '@app/equipment/equipment-core/equipment-core.module';
import { EquipmentManualModule } from '@app/equipment/equipment-manual/equipment-manual.module';

@Module({
  imports: [EquipmentManualModule, EquipmentCoreModule],
})
export class EquipmentModule {}
