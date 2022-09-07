import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentCoreController } from '@app/equipment/equipment-core/equipment-core.controller';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';
import { Equipment } from '@domain/equipment/equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment])],
  controllers: [EquipmentCoreController],
  providers: [EquipmentCoreService],
  exports: [EquipmentCoreService],
})
export class EquipmentCoreModule {}
