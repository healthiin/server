import { Equipment } from '@domain/equipment/equipment.entity';
import { GymProperties } from '@domain/gym/entities/gym';

export type GymEquipmentProperties = {
  gym: GymProperties;
  equipments: Equipment[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
