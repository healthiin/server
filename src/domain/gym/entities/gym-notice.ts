import { GymProperties } from '@domain/gym/entities/gym';
import { User } from '@domain/user/user.entity';

export type GymNoticeProperties = {
  id: string;
  title: string;
  body: string;
  author: User;
  gym: GymProperties;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
