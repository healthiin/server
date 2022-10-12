import { RoutineProperties } from '@domain/routine/routine';
import { Routine } from '@domain/routine/routine.entity';

export class RoutineProfileResponse
  implements
    Omit<
      RoutineProperties,
      'routineManuals' | 'author' | 'owner' | 'deletedAt' | 'day' | 'types'
    >
{
  id!: string;
  title!: string;
  description!: string;
  author!: string;
  owner!: string;
  days!: number[];
  status!: 'public' | 'private';
  manuals!: string[];
  types!: string[];
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Routine & { days: number[] }) {
    Object.assign(this, data);
    this.author = data.author.nickname;
    this.owner = data.owner.nickname;
    this.manuals = data.routineManuals.map((manual) => manual.id);
    this.types = data.types.map((type) => type.type);
    this.days = data.days;
  }
}
