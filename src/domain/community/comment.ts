import { Comment } from '@domain/community/comment.entity';
import { Post } from '@domain/community/post.entity';
import { User } from '@domain/user/user.entity';

export type CommentProperties = {
  id: string;
  content: string;
  author: User;
  post: Post;
  parentComment: Comment;
  childComment: Comment[] | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
