import { RoutineManualProperties } from '@domain/routine/routine-manual';
import { RoutineManual } from '@domain/routine/routine-manual.entity';

export class RoutineCardioManaulProfileResponse
  implements
    Omit<
      RoutineManualProperties,
      | 'manual'
      | 'routine'
      | 'targetNumber'
      | 'setNumber'
      | 'weight'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >
{
  id!: string;
  manualId!: string;
  speed!: number;
  playMinute!: number;
  order!: number;

  constructor(data: RoutineManual) {
    Object.assign(this, data);
    this.manualId = data.manual.id;
  }
}
