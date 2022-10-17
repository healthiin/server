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
import { PostImage } from '@domain/community/post-image.entity';
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
  @JoinColumn({ name: 'author_id' })
  author!: User;

  @OneToMany(() => Comment, ({ post }) => post, { lazy: true })
  comments!: Comment[];

  @OneToMany(() => PostLike, ({ post }) => post, { lazy: true })
  likes: PostLike[];

  likesCount!: number;

  commentsCount!: number;

  @OneToMany(() => PostImage, ({ post }) => post)
  images!: PostImage[] | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
