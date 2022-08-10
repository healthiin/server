import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { CreateEquipmentCoreData } from '@app/equipment/equipment-core/commands/create-equipment-core.data';
import { UpdateEquipmentCoreData } from '@app/equipment/equipment-core/commands/update-equipment-core.data';
import { EquipmentCoreResponse } from '@app/equipment/equipment-core/dtos/equipment-core.response';
import { Equipment } from '@domain/equipment/entities/equipment.entity';

export class EquipmentCoreService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async getEquipments(): Promise<EquipmentCoreResponse[]> {
    const equipments = await this.equipmentRepository.find();

    return equipments.map((equipment) => new EquipmentCoreResponse(equipment));
  }

  async createEquipment(
    createEquipmentCoreData: CreateEquipmentCoreData,
  ): Promise<EquipmentCoreResponse> {
    const equipment = await this.equipmentRepository.save(
      createEquipmentCoreData,
    );
    return new EquipmentCoreResponse(equipment);
  }

  async updateEquipment(
    id: string,
    updateEquipmentCoreData: UpdateEquipmentCoreData,
  ): Promise<EquipmentCoreResponse> {
    const equipment = await this.findById(id);

    const updatedEquipment = await this.equipmentRepository.save({
      ...equipment,
      ...updateEquipmentCoreData,
    });
    return new EquipmentCoreResponse(updatedEquipment);
  }

  async deleteEquipment(id: string): Promise<boolean> {
    const equipment = await this.findById(id);
    console.log(equipment);
    const { affected } = await this.equipmentRepository.softDelete({
      id: equipment.id,
    });
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
    return equipment;
  }
}
