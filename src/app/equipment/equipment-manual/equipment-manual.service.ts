import { EquipmentProfileResponse } from '@app/equipment/equipment-manual/dtos/equipment-profile.response';

export class EquipmentManualService {
  async getManuals(equipmentId: string): Promise<EquipmentProfileResponse[]> {
    return [
      {
        id: '1',
        name: 'Manual 1',
        description: 'Manual 1 description',
      },
      {
        id: '2',
        name: 'Manual 2',
        description: 'Manual 2 description',
      },
    ];

    // return this.manualRepository.find({ where: { equipmentId } });
  }

  async getManual(
    equipmentId: string,
    manualId: string,
  ): Promise<EquipmentProfileResponse> {
    return {
      id: '1',
      name: 'Manual 1',
      description: 'Manual 1 description',
    };

    // return this.manualRepository.findOne({
    //   where: { equipmentId, id: manualId },
    // });
  }
}
