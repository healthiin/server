import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EquipmentProfileResponse } from '@app/equipment/equipment-core/dtos/equipment-profile.response';
import { EquipmentCoreService } from '@app/equipment/equipment-core/equipment-core.service';
import { GymCoreService } from '@app/gym/gym-core/gym-core.service';
import { Equipment } from '@domain/equipment/equipment.entity';
import { EquipmentNotFoundException } from '@domain/equipment/equipment.errors';
import {
  DuplicatedEquipmentException,
  GymNotFoundException,
} from '@domain/errors/equipment.errors';
import { GymEquipment } from '@domain/gym/entities/gym-equipment.entity';

export class GymEquipmentService {
  constructor(
    @InjectRepository(GymEquipment)
    private readonly gymEquipmentRepository: Repository<GymEquipment>,
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
    private readonly gymCoreService: GymCoreService,
    private readonly equipmentCoreService: EquipmentCoreService,
  ) {}

  async getGymEquipmentById(
    gymId: string,
  ): Promise<EquipmentProfileResponse[]> {
    const gymEquipments = await this.gymEquipmentRepository.findOneBy({
      gym: { id: gymId },
    });
    if (!gymEquipments) {
      throw new GymNotFoundException();
    }

    return gymEquipments.equipments.map(
      (equipment) => new EquipmentProfileResponse(equipment),
    );
  }

  async addGymEquipment(
    gymId: string,
    equipmentId: string,
  ): Promise<EquipmentProfileResponse[]> {
    const gym = await this.gymCoreService.getGymById(gymId);
    if (!gym) {
      throw new GymNotFoundException();
    }

    const equipments = await this.equipmentCoreService.getEquipmentById(
      equipmentId,
    );
    if (!equipments) {
      throw new EquipmentNotFoundException();
    }

    const gymEquipments = await this.gymEquipmentRepository.findOneBy({
      gym: { id: gymId },
    });

    gymEquipments.equipments.map((equipment) => {
      if (equipment.id === equipmentId) {
        throw new DuplicatedEquipmentException();
      }
    });

    return gymEquipments.equipments.map(
      (equipment) => new EquipmentProfileResponse(equipment),
    );
  }

  async deleteGymEquipment(
    gymId: string,
    equipmentId: string,
  ): Promise<boolean> {
    const gymEquipments = await this.gymEquipmentRepository.findOneBy({
      gym: { id: gymId },
    });
    if (!gymEquipments) {
      throw new GymNotFoundException();
    }

    const equipment = gymEquipments.equipments.map(
      (equipment) => equipment.id === equipmentId,
    );
    if (!equipment) {
      throw new EquipmentNotFoundException();
    }

    const { affected } = await this.gymEquipmentRepository.delete({
      gym: { id: gymId },
      equipments: { id: equipmentId },
    });

    return affected > 0;
  }
}
