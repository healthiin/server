import { GymProperties } from '@domain/gym/entities/gym';
import { GymUserRole } from '@domain/gym/entities/gym-user.entity';
import { User } from '@domain/user/user.entity';

export type GymUserProperties = {
  id: string;
  gym: GymProperties;
  user: User;
  role: GymUserRole;
  createdAt: Date;
  deletedAt: Date | null;
};
