import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { CreateEquipmentRequest } from '@app/equipment/equipment-core/dtos/create-equipment.request';
import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import { UpdateEquipmentRequest } from '@app/equipment/equipment-core/dtos/update-equipment.request';
import { Equipment } from '@domain/equipment/entities/equipment.entity';
import {
  DuplicatedEnTitleException,
  DuplicatedTitleException,
  EquipmentNotFoundException,
} from '@domain/equipment/equipment.errors';

export class EquipmentCoreService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async searchEquipment(
    page: number,
    limit: number,
  ): Promise<Pagination<EquipmentProfileResponse>> {
    const queryBuilder =
      this.equipmentRepository.createQueryBuilder('equipment');

    const { items, meta } = await paginate(queryBuilder, { page, limit });

    return {
      items: items.map((manual) => new EquipmentProfileResponse(manual)),
      meta,
    };
  }

  async postEquipment(
    data: CreateEquipmentRequest,
  ): Promise<EquipmentProfileResponse> {
    await this.validationTitles(data.title, data.enTitle);

    const equipment = await this.equipmentRepository.save({ ...data });

    return new EquipmentProfileResponse(equipment);
  }

  async updateEquipment(
    id: string,
    data: UpdateEquipmentRequest,
  ): Promise<EquipmentProfileResponse> {
    await this.validationTitles(data.title, data.enTitle);

    const equipment = await this.equipmentRepository.findOne({ where: { id } });

    const updatedEquipment = await this.equipmentRepository.save({
      equipment,
      ...data,
    });

    return new EquipmentProfileResponse(updatedEquipment);
  }

  async deleteEquipment(id: string): Promise<boolean> {
    const equipment = await this.findById(id);

    const { affected } = await this.equipmentRepository.softDelete(
      equipment.id,
    );

    return affected > 0;
  }

  async findById(
    id: string,
    select?: FindOptionsSelect<Equipment>,
  ): Promise<Equipment> {
    const equipment = await this.equipmentRepository.findOne({
      where: { id },
      select,
    });
    if (!equipment) throw new EquipmentNotFoundException();
    return equipment;
  }

  protected async validationTitles(
    title: string,
    enTitle: string,
  ): Promise<void> {
    const titleCount = await this.equipmentRepository.count({
      where: { title },
    });
    if (titleCount > 0) throw new DuplicatedTitleException();

    const enTitleCount = await this.equipmentRepository.count({
      where: { enTitle },
    });
    if (enTitleCount > 0) throw new DuplicatedEnTitleException();
  }
}
