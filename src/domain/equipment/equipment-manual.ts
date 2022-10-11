import { Equipment } from '@domain/equipment/equipment.entity';
import { ManualType } from '@domain/equipment/manual-type';
import { RoutineManual } from '@domain/routine/routine-manual.entity';

export type ManualProperties = {
  id: string;
  title: string;
  enTitle: string;
  description: string;
  precaution: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  type: ManualType;
  equipment: Equipment;
  routineManual: RoutineManual[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
