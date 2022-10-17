import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from '@domain/community/post.entity';
import { User } from '@domain/user/user.entity';

@Entity('post_likes')
export class PostLike {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Post, ({ likes }) => likes)
  post: Post;

  @ManyToOne(() => User, ({ postLikes }) => postLikes)
  user: User;
}
