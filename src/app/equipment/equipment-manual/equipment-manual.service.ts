import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import {
  ManualCreateCommand,
  ManualDeleteCommand,
  ManualUpdateCommand,
} from '@app/equipment/equipment-manual/equipment-manual.command';
import { Manual } from '@domain/equipment/equipment-manual.entity';
import { ManualType } from '@domain/equipment/equipment-type';
import { ManualNotFoundException } from '@domain/equipment/manual.errors';

export class EquipmentManualService {
  constructor(
    @InjectRepository(Manual)
    private readonly manualRepository: Repository<Manual>,
    private readonly equipmentCoreService: EquipmentCoreService,
  ) {}

  async getAllManuals(): Promise<ManualProfileResponse[]> {
    const manuals = await this.manualRepository.find();

    return manuals.map((manual) => new ManualProfileResponse(manual));
  }

  async getManualsByType(type: ManualType): Promise<ManualProfileResponse[]> {
    const manuals = await this.manualRepository.findBy({ type });

    return manuals.map((manual) => new ManualProfileResponse(manual));
  }

  async getManualById(id: string): Promise<ManualProfileResponse> {
    const manual = await this.manualRepository.findOne({ where: { id } });

    return new ManualProfileResponse(manual);
  }

  async getManualsByEquipmentId(
    equipmentId: string,
  ): Promise<ManualProfileResponse[]> {
    const equipment = await this.equipmentCoreService.getEquipmentById(
      equipmentId,
    );
    const manuals = await this.manualRepository.findBy({
      equipment: { id: equipment.id },
    });

    return manuals.map(
      (manual) =>
        new ManualProfileResponse({
          ...manual,
          equipment: equipment,
        }),
    );
  }

  async createManual(data: ManualCreateCommand): Promise<Manual> {
    const { equipmentId, ...rest } = data;
    const equipment = await this.equipmentCoreService.getEquipmentById(
      equipmentId,
    );

    return await this.manualRepository.save({
      ...rest,
      equipment: { id: equipment.id },
    });
  }

  async updateManual(data: ManualUpdateCommand): Promise<Manual> {
    if (!data.equipmentId == null) {
      const equipment = await this.equipmentCoreService.getEquipmentById(
        data.equipmentId,
      );
      data.equipmentId = equipment.id;
    }

    const manual = await this.findById(data.manualId);
    if (!manual) throw new ManualNotFoundException();

    return await this.manualRepository.save({
      ...manual,
      ...data,
    });
  }

  async withdrawManual(data: ManualDeleteCommand): Promise<boolean> {
    const manual = await this.findById(data.manualId);
    if (!manual) throw new ManualNotFoundException();

    const { affected } = await this.manualRepository.softDelete(manual.id);

    return affected > 0;
  }

  async findById(
    id: string,
    select?: FindOptionsSelect<Manual>,
  ): Promise<Manual> {
    const manual = await this.manualRepository.findOne({
      where: { id },
      select,
    });

    if (!manual) throw new ManualNotFoundException();

    return manual;
  }
}
