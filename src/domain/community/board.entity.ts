import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BoardProperties } from '@domain/community/board';
import { Post } from '@domain/community/post.entity';

@Entity('boards')
export class Board implements BoardProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: String, nullable: true })
  description!: string | null;

  @Column({ type: String, nullable: true, unique: true })
  slug!: string | null;

  @OneToMany(() => Post, ({ board }) => board)
  posts!: Post[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
