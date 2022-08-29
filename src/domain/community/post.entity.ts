import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Board } from '@domain/community/board.entity';
import { PostProperties } from '@domain/community/post';
import { User } from '@domain/user/user.entity';

@Entity('posts')
export class Post implements PostProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Board, ({ posts }) => posts)
  board!: Board;

  @ManyToOne(() => User, ({ posts }) => posts)
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
