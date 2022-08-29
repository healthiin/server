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

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  nickname!: string;

  @Column({ nullable: true })
  avatarImage!: string | null;

  @Column()
  phoneNumber!: string;

  @OneToMany(() => GymUser, ({ user }) => user)
  gyms!: GymUser[];

  @OneToMany(() => GymNotice, ({ author }) => author)
  gymNotices: GymNotice[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @OneToMany(() => Post, ({ author }) => author)
  posts: Post[];

  @OneToMany(() => Comment, ({ author }) => author)
  comments!: Comment[];
}
