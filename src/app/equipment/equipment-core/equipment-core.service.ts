import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import {
  EquipmentCreateCommand,
  EquipmentDeleteCommand,
  EquipmentUpdateCommand,
} from '@app/equipment/equipment-core/equipment-core.command';
import { Equipment } from '@domain/equipment/equipment.entity';
import { EquipmentNotFoundException } from '@domain/equipment/equipment.errors';

export class EquipmentCoreService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async getEquipments(): Promise<EquipmentProfileResponse[]> {
    const equipments = await this.equipmentRepository.find();

    return equipments.map(
      (equipment) => new EquipmentProfileResponse(equipment),
    );
  }

  async getEquipmentById(
    id: string,
    select?: FindOptionsSelect<Equipment>,
  ): Promise<Equipment> {
    const equipment = await this.equipmentRepository.findOne({
      where: { id },
      select,
    });
    if (!equipment) {
      throw new EquipmentNotFoundException();
    }
    return equipment;
  }

  async createEquipment(data: EquipmentCreateCommand): Promise<Equipment> {
    return await this.equipmentRepository.save(data);
  }

  async updateEquipment(data: EquipmentUpdateCommand): Promise<Equipment> {
    const equipment = await this.getEquipmentById(data.equipmentId);

    return this.equipmentRepository.save({
      ...equipment,
      ...data,
    });
  }

  async deleteEquipment(data: EquipmentDeleteCommand): Promise<boolean> {
    const equipment = await this.getEquipmentById(data.equipmentId);
    console.log(equipment);
    const { affected } = await this.equipmentRepository.softDelete({
      id: equipment.id,
    });
    return affected > 0;
  }
}
