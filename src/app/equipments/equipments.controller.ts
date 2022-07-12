import { EquipmentsService } from './equipments.service';
import { Controller, Get, Param } from '@nestjs/common';
import { Equipment } from './entities/equipment.entities';

@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Get()
  getAll(): Equipment[] {
    return this.equipmentsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') equipmentId: number): Equipment {
    return this.equipmentsService.getOne(equipmentId);
  }
}
