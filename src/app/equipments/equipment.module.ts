import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentController } from '../../../dist/app/equipments/equipment.controller';
import { EquipmentService } from '../../../dist/app/equipments/equipment.service';

@Module({
  imports: [],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class UserModule {}
