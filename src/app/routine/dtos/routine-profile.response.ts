import { RoutineProperties } from '@domain/routine/routine';
import { Routine } from '@domain/routine/routine.entity';

export class RoutineProfileResponse
  implements Omit<RoutineProperties, 'manuals' | 'author' | 'deletedAt'>
{
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Routine) {
    Object.assign(this, data);
  }
}
