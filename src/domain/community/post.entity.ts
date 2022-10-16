import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Board } from '@domain/community/board.entity';
import { Comment } from '@domain/community/comment.entity';
import { PostProperties } from '@domain/community/post';
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
  @JoinColumn({ name: 'author_id' })
  author!: User;

  @OneToMany(() => Comment, ({ post }) => post)
  comments!: Comment[];

  likesCount!: number;

  commentsCount!: number;

  images!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
