import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { CreateEquipmentManualData } from '@app/equipment/equipment-manual/commands/create-equipment-manual.data';
import { UpdateEquipmentManualData } from '@app/equipment/equipment-manual/commands/update-equipment-manual.data';
import { CreateEquipmentManualRequest } from '@app/equipment/equipment-manual/dtos/create-equipment-manual.request';
import { EquipmentManualProfileResponse } from '@app/equipment/equipment-manual/dtos/equipment-manual-profile.response';
import { UpdateEquipmentManualRequest } from '@app/equipment/equipment-manual/dtos/update-equipment-manual.request';
import { EquipmentManual } from '@domain/equipment/entities/equipment-manual.entity';
import { EquipmentManualNotFoundException } from '@domain/equipment/equipment.errors';

export class EquipmentManualService {
  constructor(
    @InjectRepository(EquipmentManual)
    private readonly equipmentManualRepository: Repository<EquipmentManual>,
  ) {}
  async searchManual(
    equipmentId: string,
    page: number,
    limit: number,
  ): Promise<Pagination<EquipmentManualProfileResponse>> {
    const queryBuilder =
      this.equipmentManualRepository.createQueryBuilder('manual');
    queryBuilder.where('manual.equipment.id = :equipmentId', { equipmentId });

    const { items, meta } = await paginate(queryBuilder, { page, limit });
    return {
      items: items.map((manual) => new EquipmentManualProfileResponse(manual)),
      meta,
    };
  }

  async getManualProfile(id: string): Promise<EquipmentManualProfileResponse> {
    const manual = await this.findById(id);
    return new EquipmentManualProfileResponse(manual);
  }

  async createManual(
    equipmentId: string,
    data: CreateEquipmentManualData,
  ): Promise<EquipmentManualProfileResponse> {
    const manual = await this.equipmentManualRepository.save({
      equipment: { id: equipmentId },
      ...data,
    });
    return new EquipmentManualProfileResponse(manual);
  }

  async updateManual(
    manualId: string,
    data: UpdateEquipmentManualData,
  ): Promise<EquipmentManualProfileResponse> {
    const manual = await this.findById(manualId);

    const updatedManual = await this.equipmentManualRepository.save({
      ...manual,
      ...data,
    });

    return new EquipmentManualProfileResponse(updatedManual);
  }

  async deleteManual(manualId: string): Promise<boolean> {
    const manual = await this.findById(manualId);

    const { affected } = await this.equipmentManualRepository.softDelete(
      manual.id,
    );

    return affected > 0;
  }

  async findById(
    id: string,
    select?: FindOptionsSelect<EquipmentManual>,
  ): Promise<EquipmentManual> {
    const manual = await this.equipmentManualRepository.findOne({
      where: { id },
      select,
    });

    if (!manual) throw new EquipmentManualNotFoundException();

    return manual;
  }
}
