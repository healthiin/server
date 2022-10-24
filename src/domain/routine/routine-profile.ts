import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { User } from '@domain/user/user.entity';

export type RoutineProperties = {
  id: string;
  title: string;
  description: string | null;
  author: User;
  owner: User;
  day: number;
  // types: RoutineType[];
  routineManuals: RoutineManual[];
  status: 'public' | 'private';
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
