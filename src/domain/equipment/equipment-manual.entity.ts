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

import { ManualProperties } from '@domain/equipment/equipment-manual';
import { ManualType } from '@domain/equipment/equipment-type';
import { Equipment } from '@domain/equipment/equipment.entity';
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

  @ManyToOne(() => Equipment, (equipment) => equipment.manuals)
  @JoinColumn()
  equipment: Equipment;

  @OneToMany(() => RoutineManual, (routineManual) => routineManual.manual)
  routineManual: RoutineManual[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
