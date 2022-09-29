import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';
import { ManualType } from '@app/equipment/equipment-manual/dtos/manual-create.request';
import { ManualProfileResponse } from '@app/equipment/equipment-manual/dtos/manual-profile.response';
import {
  ManualCreateCommand,
  ManualDeleteCommand,
  ManualUpdateCommand,
} from '@app/equipment/equipment-manual/equipment-manual.command';
import { Manual } from '@domain/equipment/equipment-manual.entity';
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

  async getManualsByEquipmentId(id: string): Promise<ManualProfileResponse[]> {
    const manuals = await this.manualRepository.findBy({ equipment: { id } });
    const equipment = await this.equipmentCoreService.getEquipmentById(
      manuals[0].equipment.id,
    );

    return manuals.map(
      (manual) =>
        new ManualProfileResponse({
          ...manual,
          equipment,
        }),
    );
  }

  async createManual(equipmentId, data: ManualCreateCommand): Promise<Manual> {
    await this.equipmentCoreService.getEquipmentById(equipmentId);

    return await this.manualRepository.save({
      ...data,
      equipment: { id: equipmentId },
    });
  }

  async updateManual(data: ManualUpdateCommand): Promise<Manual> {
    const manual = await this.findById(data.manualId);

    if (data.equipmentId) {
      const equipment = await this.equipmentCoreService.getEquipmentById(
        data.equipmentId,
      );
      const manualAndEquipment = { ...manual, equipment };
      return await this.manualRepository.save({
        ...manualAndEquipment,
        ...data,
      });
    }

    return await this.manualRepository.save({
      ...manual,
      ...data,
    });
  }

  async withdrawManual(data: ManualDeleteCommand): Promise<boolean> {
    const manual = await this.findById(data.manualId);

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
