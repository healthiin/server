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

import { ManualProperties } from '@domain/equipment/equipment-manual';
import { Equipment } from '@domain/equipment/equipment.entity';
import { ManualType } from '@domain/equipment/manual-type';
import { RoutineManual } from '@domain/routine/routine-manual.entity';

@Entity('manuals')
export class Manual implements ManualProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  enTitle: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  precaution: string | null;

  @Column({ nullable: true })
  imageUrl: string | null;

  @Column({ nullable: true })
  videoUrl: string | null;

  @Column()
  type: ManualType;

  @ManyToOne(() => Equipment, ({ manuals }) => manuals)
  equipment!: Equipment;

  @OneToMany(() => RoutineManual, ({ manual }) => manual)
  routineManual: RoutineManual[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
