import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateManualData } from '@app/equipment/equipment-manual/commands/create-manual.data';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import { Manual } from '@domain/equipment/entities/manual.entity';

export class EquipmentManualService {
  constructor(
    @InjectRepository(Manual)
    private readonly manualRepository: Repository<Manual>,
  ) {}
  async getManuals(equipmentId: string): Promise<ManualProfileResponse[]> {
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
  }

  async getManual(
    equipmentId: string,
    manualId: string,
  ): Promise<ManualProfileResponse> {
    return {
      id: '1',
      name: 'Manual 1',
      description: 'Manual 1 description',
    };
  }

  async createManual(
    equipmentId: string,
    createManualData: CreateManualData,
  ): Promise<ManualProfileResponse> {
    const manual = this.manualRepository.save(createManualData);
    return manual;
  }
}
