import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { CreateEquipmentData } from '@app/equipment/equipment-core/commands/create-equipment.data';
import { UpdateEquipmentData } from '@app/equipment/equipment-core/commands/update-equipment.data';
import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
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
    data: CreateEquipmentData,
  ): Promise<EquipmentProfileResponse> {
    await this.validateTitles(data.title, data.enTitle);
    const equipment = await this.equipmentRepository.save({ ...data });
    return new EquipmentProfileResponse(equipment);
  }

  async updateEquipment(
    id: string,
    data: UpdateEquipmentData,
  ): Promise<EquipmentProfileResponse> {
    await this.validateTitles(data.title, data.enTitle);

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

  protected async validateTitles(
    title: string,
    enTitle: string,
  ): Promise<void> {
    await Promise.all([
      this.equipmentRepository.count({ where: { title } }).then((count) => {
        if (count > 0) throw new DuplicatedTitleException();
      }),
      this.equipmentRepository.count({ where: { enTitle } }).then((count) => {
        if (count > 0) throw new DuplicatedEnTitleException();
      }),
    ]);
  }
}
