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

import { ManualType } from '@app/equipment/equipment-manual/dtos/manual-create.request';
import { ManualProperties } from '@domain/equipment/equipment-manual';
import { Equipment } from '@domain/equipment/equipment.entity';
import { Routine } from '@domain/routine/routine.entity';

@Entity('manuals')
export class Manual implements ManualProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  enTitle: string;

  @Column()
  description: string;

  @Column()
  precautions: string;

  @Column()
  type: ManualType;

  @ManyToOne(() => Equipment, (equipment) => equipment.manuals)
  equipment: Equipment;

  @ManyToOne(() => Routine, (routine) => routine.manuals)
  @JoinColumn()
  routine!: Routine;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
