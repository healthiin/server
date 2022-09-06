import { Manual } from '@domain/equipment/equipment-manual.entity';
import { User } from '@domain/user/user.entity';

export type RoutineProperties = {
  id: string;
  title: string;
  description: string | null;
  author: User;
  manuals: Manual[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
