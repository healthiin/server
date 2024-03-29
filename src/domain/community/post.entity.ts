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

import { Board } from '@domain/community/board.entity';
import { Comment } from '@domain/community/comment.entity';
import { PostProperties } from '@domain/community/post';
import { PostLike } from '@domain/community/post-like.entity';
import { User } from '@domain/user/user.entity';

@Entity('posts')
export class Post implements PostProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Board, ({ posts }) => posts)
  board!: Board;

  @ManyToOne(() => User, ({ posts }) => posts)
  author!: User;

  @OneToMany(() => Comment, ({ post }) => post, { lazy: true })
  comments!: Comment[];

  @OneToMany(() => PostLike, ({ post }) => post, { lazy: true })
  likes: PostLike[];

  @Column({ type: 'int', default: 0 })
  views!: number;

  @Column({ type: 'int', default: 0 })
  likesCount!: number;

  @Column({ type: 'int', default: 0 })
  commentsCount!: number;

  @Column({ type: 'text', array: true, default: [] })
  images!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
