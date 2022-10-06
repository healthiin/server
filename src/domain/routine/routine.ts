import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { User } from '@domain/user/user.entity';

export type RoutineProperties = {
  id: string;
  title: string;
  description: string | null;
  author: User;
  routineManuals: RoutineManual[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
