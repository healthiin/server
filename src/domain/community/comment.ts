import { User } from '@domain/user/user.entity';

export type CommentProperties = {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
