import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Comment } from '@domain/community/comment.entity';
import { Post } from '@domain/community/post.entity';
import { GymNotice } from '@domain/gym/entities/gym-notice.entity';
import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { Routine } from '@domain/routine/routine.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  username: string | null;

  @Column({ nullable: true })
  ageRange: string | null;

  @Column({ nullable: true })
  gender: string | null;

  @Column({ nullable: true })
  nickname!: string;

  @Column({ nullable: true })
  userEmail: string | null;

  @Column({ nullable: true })
  avatarImage!: string | null;

  @Column({ default: false })
  isAdmin!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @OneToMany(() => GymUser, ({ user }) => user)
  gyms!: GymUser[];

  @OneToMany(() => GymNotice, ({ author }) => author)
  gymNotices: GymNotice[];

  @OneToMany(() => Post, ({ author }) => author)
  posts: Post[];

  @OneToMany(() => Comment, ({ author }) => author)
  comments!: Comment[];

  @OneToMany(() => Routine, ({ author }) => author)
  routines!: Routine[];
}
