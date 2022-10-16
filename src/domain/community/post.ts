import { User } from '@domain/user/user.entity';

export type PostProperties = {
  id: string;
  title: string;
  content: string;
  author: User;
  likesCount: number;
  commentsCount: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
