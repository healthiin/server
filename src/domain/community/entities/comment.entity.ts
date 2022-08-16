import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Board } from '@domain/community/entities/board.entity';
import { User } from '@domain/user/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @ManyToOne(() => Comment, (comment) => comment.id)
  parentCommentId: Comment;

  @OneToOne(() => User)
  user: User;

  @ManyToOne(() => Post, (board) => board.id)
  board: Post;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
