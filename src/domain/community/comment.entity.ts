import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Post, ({ comments }) => comments, {
    eager: true,
  })
  post!: Post;

  @ManyToOne(() => User, ({ comments }) => comments, {
    eager: true,
  })
  author!: User;

  @ManyToOne(() => Comment, (comment) => comment.childComment)
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  childComment: Comment[] | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
