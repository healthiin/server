import { RoutineProperties } from '@domain/routine/routine';
import { Routine } from '@domain/routine/routine.entity';

export class RoutineProfileResponse
  implements
    Omit<
      RoutineProperties,
      'routineManuals' | 'author' | 'owner' | 'deletedAt'
    >
{
  id!: string;
  title!: string;
  description!: string;
  author!: string;
  owner!: string;
  status!: 'public' | 'private';
  manuals!: string[];
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Routine) {
    Object.assign(this, data);
    this.author = data.author.nickname;
    this.owner = data.owner.nickname;
    this.manuals = data.routineManuals.map((manual) => manual.id);
  }
}
