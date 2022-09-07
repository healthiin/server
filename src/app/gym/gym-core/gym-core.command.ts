import { GymProperties } from '@domain/gym/entities/gym';

type UserInfo = { userId: string };

export type GymListQuery = {
  page: number;
  limit: number;
};

export type GymCreateCommand = UserInfo &
  Pick<GymProperties, 'name'> &
  Partial<Pick<GymProperties, 'description' | 'location' | 'contact'>>;

export type GymUpdateCommand = Partial<GymCreateCommand>;
