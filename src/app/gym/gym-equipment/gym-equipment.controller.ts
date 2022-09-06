import { Controller, Delete, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GymEquipment } from '@domain/gym/entities/gym-equipment.entity';

@Controller('gyms/:gymId/equipments')
export class GymEquipmentController {
  constructor(
    @InjectRepository(GymEquipment)
    private readonly gymEquipmentRepository: Repository<GymEquipment>,
  ) {}

  @Get()
  async getGymEquipmentById(): Promise<void> {
    return;
  }

  @Post('/:equipmentId')
  async addGymEquipment(): Promise<void> {
    return;
  }

  @Delete('/:equipmentId')
  async deleteGymEquipment(): Promise<void> {
    return;
  }
}
