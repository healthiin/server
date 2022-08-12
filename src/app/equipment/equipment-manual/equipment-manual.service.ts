import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateManualData } from '@app/equipment/equipment-manual/commands/create-manual.data';
import { UpdateManualData } from '@app/equipment/equipment-manual/commands/update-manual.data';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import { Manual } from '@domain/equipment/entities/manual.entity';

export class EquipmentManualService {
  constructor(
    @InjectRepository(Manual)
    private readonly manualRepository: Repository<Manual>,
  ) {}

  async getAllManuals(): Promise<ManualProfileResponse[]> {
    const manuals = await this.manualRepository.find();
    return manuals.map((manual) => new ManualProfileResponse(manual));
  }

  async getManuals(equipmentId: string): Promise<ManualProfileResponse[]> {
    const manuals = await this.manualRepository.find({
      where: { id: equipmentId },
    });
    return manuals.map((manual) => new ManualProfileResponse(manual));
  }

  async getManual(
    equipmentId: string,
    manualId: string,
  ): Promise<ManualProfileResponse> {
    // 기구랑 연동이 필요.
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
    const manual = await this.manualRepository.save(createManualData);
    return new ManualProfileResponse(manual);
  }

  async updateManual(
    equipmentId: string,
    manualId: string,
    createManualData: UpdateManualData,
  ): Promise<ManualProfileResponse> {
    const manual = await this.manualRepository.findOne({
      where: {
        id: manualId,
      },
    });
    const updatedManual = await this.manualRepository.save({
      ...manual,
      ...createManualData,
    });
    return new ManualProfileResponse(updatedManual);
  }
}
