import { Board } from '@domain/community/board.entity';
import { User } from '@domain/user/user.entity';

export type PostProperties = {
  id: string;
  title: string;
  content: string;
  author: User;
  views: number;
  likesCount: number;
  commentsCount: number;
  images: string[];
  board: Board;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
