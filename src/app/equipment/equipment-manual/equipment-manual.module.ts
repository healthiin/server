import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentCoreModule } from '@app/equipment/equipment-core/equipment-core.module';
import { EquipmentManualController } from '@app/equipment/equipment-manual/equipment-manual.controller';
import { EquipmentManualService } from '@app/equipment/equipment-manual/equipment-manual.service';
import { Manual } from '@domain/equipment/equipment-manual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manual]), EquipmentCoreModule],
  controllers: [EquipmentManualController],
  providers: [EquipmentManualService],
})
export class EquipmentManualModule {}
