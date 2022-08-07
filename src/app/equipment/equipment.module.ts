import { Module } from '@nestjs/common';

import { EquipmentCoreModule } from '@app/equipment/equipment-core/equipment-core.module';

@Module({ imports: [EquipmentCoreModule] })
export class EquipmentModule {}
