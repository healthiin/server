import { GymEquipmentProperties } from '@domain/gym/entities/gym-equipment';
import { GymNoticeProperties } from '@domain/gym/entities/gym-notice';
import { GymUserProperties } from '@domain/gym/entities/gym-user';

export type GymProperties = {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  contact: string | null;
  users: GymUserProperties[];
  equipments: GymEquipmentProperties[];
  notices: GymNoticeProperties[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
