import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GymEquipmentController } from '@app/gym/gym-equipment/gymEquipment.controller';
import { GymEquipmentService } from '@app/gym/gym-equipment/gymEquipment.service';
import { GymEquipment } from '@domain/gym/entities/gym-equipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GymEquipment])],
  controllers: [GymEquipmentController],
  providers: [GymEquipmentService],
})
export class GymNoticeModule {}
