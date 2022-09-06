import { RoutineProperties } from '@domain/routine/routine';
import { Routine } from '@domain/routine/routine.entity';

export class RoutineProfileResponse
  implements Omit<RoutineProperties, 'manuals' | 'author' | 'deletedAt'>
{
  id!: string;
  title!: string;
  description!: string;
  author!: string;
  manuals!: string[];
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Routine) {
    Object.assign(this, data);
    this.author = data.author.nickname;
    this.manuals = data.manuals.map((manual) => manual.id);
  }
}
