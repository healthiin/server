import { Equipment } from '@domain/equipment/entities/equipment.entity';
import { GymProperties } from '@domain/gym/entities/gym';

export type GymEquipmentProperties = {
  gym: GymProperties;
  equipment: Equipment;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
