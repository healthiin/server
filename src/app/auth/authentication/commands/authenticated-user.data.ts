import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { User } from '@domain/user/user.entity';

export type AuthenticatedUserData = User & {
  gyms: GymUser[];
};
