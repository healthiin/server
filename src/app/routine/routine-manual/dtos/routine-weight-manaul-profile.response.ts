import { RoutineManualProperties } from '@domain/routine/routine-manual';
import { RoutineManual } from '@domain/routine/routine-manual.entity';

export class RoutineWeightManaulProfileResponse
  implements
    Omit<
      RoutineManualProperties,
      | 'manual'
      | 'routine'
      | 'speed'
      | 'playMinute'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >
{
  id!: string;
  manualId!: string;
  targetNumber!: number;
  setNumber!: number;
  weight!: number;
  order!: number;

  constructor(data: RoutineManual) {
    Object.assign(this, data);
    this.manualId = data.manual.id;
  }
}
