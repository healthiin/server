import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/create-equipment-core.request';
import { EquipmentCoreResponse } from '@app/equipment/equipment-core/dtos/equipment-core.response';
import { UpdateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/update-equipment-core.request';
import { Equipment } from '@domain/equipment/entities/equipment.entity';

export class EquipmentCoreService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async getEquipments(): Promise<EquipmentCoreResponse[]> {
    return [
      {
        id: '1',
        name: 'Equipment 1',
        description: 'Description 1',
      },
      {
        id: '2',
        name: 'Equipment 2',
        description: 'Description 2',
      },
    ];
  }

  async createEquipment(
    createEquipmentCoreRequest: CreateEquipmentCoreRequest,
  ): Promise<EquipmentCoreResponse> {
    return {
      id: '3',
      name: createEquipmentCoreRequest.name,
      description: createEquipmentCoreRequest.description,
    };
  }

  async updateEquipment(
    updateEquipmentCoreRequest: UpdateEquipmentCoreRequest,
  ): Promise<EquipmentCoreResponse> {
    return {
      id: '3',
      name: updateEquipmentCoreRequest.name,
      description: updateEquipmentCoreRequest.description,
    };
  }
  async deleteEquipment(id: string): Promise<boolean> {
    return true;
  }
}
