import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Manual } from '@domain/equipment/equipment-manual.entity';
import { RoutineManualProperties } from '@domain/routine/routine-manual';
import { Routine } from '@domain/routine/routine.entity';

@Entity('routine_manuals')
export class RoutineManual implements RoutineManualProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Manual, (manual) => manual.routineManual)
  @JoinColumn()
  manual: Manual;

  @ManyToOne(() => Routine, (routine) => routine.routineManuals)
  routine: Routine;

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
}
