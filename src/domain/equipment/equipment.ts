import { Manual } from '@domain/equipment/equipment-manual.entity';
import { GymEquipment } from '@domain/gym/entities/gym-equipment.entity';

export type EquipmentProperties = {
  id: string;
  name: string;
  enName: string;
  description: string | null;
  manuals: Manual[];
  gymEquipment: GymEquipment[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
