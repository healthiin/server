import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RoutineLogProperties } from '@domain/routine/routine-log';
import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { Routine } from '@domain/routine/routine.entity';
import { User } from '@domain/user/user.entity';

@Entity('routine_logs')
export class RoutineLog implements RoutineLogProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  targetNumber!: number;

  @Column({ nullable: true })
  setNumber!: number;

  @Column({ nullable: true })
  weight!: number;

  @Column({ nullable: true })
  speed!: number;

  @Column({ nullable: true })
  playMinute!: number;

  @Column()
  startedAt: Date;

  @Column()
  endedAt: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, ({ routineLogs }) => routineLogs)
  user!: User;

  @ManyToOne(() => Routine, ({ logs }) => logs)
  routine!: Routine;

  @ManyToOne(() => RoutineManual, ({ logs }) => logs)
  manual!: RoutineManual;
}
