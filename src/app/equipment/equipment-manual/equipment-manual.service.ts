import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateManualData } from '@app/equipment/equipment-manual/commands/create-manual.data';
import { UpdateManualData } from '@app/equipment/equipment-manual/commands/update-manual.data';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import { Equipment } from '@domain/equipment/entities/equipment.entity';
import { Manual } from '@domain/equipment/entities/manual.entity';
import { ManualNotFoundException } from '@domain/equipment/manual.errors';

export class EquipmentManualService {
  constructor(
    @InjectRepository(Manual)
    private readonly manualRepository: Repository<Manual>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async getAllManuals(): Promise<ManualProfileResponse[]> {
    const manuals = await this.manualRepository.find();
    return manuals.map((manual) => new ManualProfileResponse(manual));
  }

  async getManualsByEquipment(
    equipmentId: string,
  ): Promise<ManualProfileResponse[]> {
    const manuals = await this.manualRepository.find({
      where: { equipment: { id: equipmentId } },
    });

    return manuals.map((manual) => new ManualProfileResponse(manual));
  }

  async getManual(manualId: string): Promise<ManualProfileResponse> {
    const manual = await this.findManualById(manualId);

    return new ManualProfileResponse(manual);
  }

  async createManual(
    equipmentId: string,
    createManualData: CreateManualData,
  ): Promise<ManualProfileResponse> {
    const equipment = await this.equipmentRepository.findOne({
      where: { id: equipmentId },
    });

    const manual = await this.manualRepository.save({
      ...createManualData,
      equipment,
    });

    return new ManualProfileResponse(manual);
  }

  async updateManual(
    manualId: string,
    createManualData: UpdateManualData,
  ): Promise<ManualProfileResponse> {
    const manual = await this.findManualById(manualId);
    const updatedManual = await this.manualRepository.save({
      ...manual,
      ...createManualData,
    });
    return new ManualProfileResponse(updatedManual);
  }

  async deleteManual(manualId: string): Promise<ManualProfileResponse> {
    const manual = await this.findManualById(manualId);
    await this.manualRepository.softDelete(manual);
    return new ManualProfileResponse(manual);
  }

  async findManualById(manualId: string): Promise<Manual> {
    const manual = await this.manualRepository.findOne({
      where: {
        id: manualId,
      },
    });
    if (!manual) throw new ManualNotFoundException();

    return manual;
  }
}
