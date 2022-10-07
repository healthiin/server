import { Manual } from '@domain/equipment/equipment-manual.entity';
import { Routine } from '@domain/routine/routine.entity';

export type RoutineManualProperties = {
  id: string;
  manual: Manual;
  routine: Routine;
  targetNumber: number | null;
  setNumber: number | null;
  weight: number | null;
  speed: number | null;
  playMinute: number | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
