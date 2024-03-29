import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GymNoticeProperties } from '@domain/gym/entities/gym-notice';
import { Gym } from '@domain/gym/entities/gym.entity';
import { User } from '@domain/user/user.entity';

@Entity('gym_notices')
export class GymNotice implements GymNoticeProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  body!: string;

  @ManyToOne(() => User, ({ gymNotices }) => gymNotices)
  author!: User;

  @ManyToOne(() => Gym, ({ notices }) => notices)
  gym!: Gym;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
