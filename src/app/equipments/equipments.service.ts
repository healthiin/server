import { Injectable, NotFoundException } from '@nestjs/common';
import { Equipment } from './entities/equipment.entities';

@Injectable()
export class EquipmentsService {
  private equipments: Equipment[] = [];

  getAll(): Equipment[] {
    return this.equipments;
  }

  getOne(id: number): Equipment {
    const equipment = this.equipments.find(
      (equipment) => equipment.id === Number(id),
    );
    if (!equipment) {
      throw new NotFoundException(`equipment id ${id} not found`);
    }
    return equipment;
  }
}
