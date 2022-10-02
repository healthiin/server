import { ManualType } from '@domain/equipment/equipment-type';
import { Equipment } from '@domain/equipment/equipment.entity';
import { Routine } from '@domain/routine/routine.entity';

export type ManualProperties = {
  id: string;
  title: string;
  enTitle: string;
  description: string | null;
  type: ManualType;
  equipment: Equipment;
  routine: Routine;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
