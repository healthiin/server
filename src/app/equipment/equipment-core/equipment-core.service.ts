import { CreateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/create-equipment-core.request';
import { UpdateEquipmentCoreRequest } from '@app/equipment/equipment-core/dtos/update-equipment-core.request';

export class EquipmentCoreService {
  async getEquipments(): Promise<object[]> {
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
  ): Promise<object> {
    return {
      id: '3',
      name: createEquipmentCoreRequest.name,
      description: createEquipmentCoreRequest.description,
    };
  }

  async updateEquipment(
    updateEquipmentCoreRequest: UpdateEquipmentCoreRequest,
  ): Promise<object> {
    return {
      id: '3',
      name: updateEquipmentCoreRequest.name,
      description: updateEquipmentCoreRequest.description,
    };
  }
}
