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
import { PostLike } from '@domain/community/post-like.entity';
import { Post } from '@domain/community/post.entity';
import { GymNotice } from '@domain/gym/entities/gym-notice.entity';
import { GymUser } from '@domain/gym/entities/gym-user.entity';
import { Meal } from '@domain/meal/meal.entity';
import { RoutineLike } from '@domain/routine/routine-like.entity';
import { RoutineLog } from '@domain/routine/routine-log.entity';
import { Routine } from '@domain/routine/routine.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ nullable: true, unique: true })
  nickname!: string | null;

  @Column({ nullable: true })
  ageRange!: string | null;

  @Column({ nullable: true })
  gender!: string | null;

  @Column({ nullable: true })
  userEmail!: string | null;

  @Column({ nullable: true })
  avatarImage!: string | null;

  @Column({ default: false })
  isAdmin!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

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

  @OneToMany(() => Meal, ({ user }) => user)
  meals!: Meal[];

  @OneToMany(() => PostLike, ({ user }) => user)
  postLikes!: PostLike[];

  @OneToMany(() => RoutineLike, ({ user }) => user)
  routineLikes!: RoutineLike[];

  @OneToMany(() => RoutineLog, ({ user }) => user)
  routineLogs: RoutineLog[];
}
