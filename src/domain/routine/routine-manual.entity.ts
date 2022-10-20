import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Manual } from '@domain/equipment/equipment-manual.entity';
import { RoutineLog } from '@domain/routine/routine-log.entity';
import { RoutineManualProperties } from '@domain/routine/routine-manual';
import { Routine } from '@domain/routine/routine.entity';

@Entity('routine_manuals')
export class RoutineManual implements RoutineManualProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Manual, ({ routineManual }) => routineManual)
  manual!: Manual;

  @ManyToOne(() => Routine, ({ routineManuals }) => routineManuals)
  routine!: Routine;

  @Column({ nullable: true })
  targetNumber: number | null;

  @Column({ nullable: true })
  setNumber: number | null;

  @Column({ nullable: true })
  weight: number | null;

  @Column({ nullable: true })
  speed: number | null;

  @Column({ nullable: true })
  playMinute: number | null;

  @Column()
  order: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @OneToMany(() => RoutineLog, ({ manual }) => manual)
  logs!: RoutineLog[];
}
