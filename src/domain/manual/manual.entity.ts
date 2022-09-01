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

import { Routine } from '@domain/routine/routine.entity';

@Entity('manuals')
export class Manual {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  enTitle!: string;

  @Column()
  type!: 'back' | 'shoulder' | 'chest' | 'arm' | 'lef' | 'abs';

  @Column()
  difficulty!: number;

  @Column()
  description!: string;

  @Column()
  precautions!: string;

  @ManyToOne(() => Routine, (routine) => routine.manuals)
  @JoinColumn()
  routine!: Routine;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
