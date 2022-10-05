import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CommentProperties } from '@domain/community/comment';
import { Post } from '@domain/community/post.entity';
import { User } from '@domain/user/user.entity';

@Entity('comments')
export class Comment implements CommentProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Post, ({ comments }) => comments)
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @ManyToOne(() => User, ({ comments }) => comments)
  @JoinColumn({ name: 'author_id' })
  author!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
