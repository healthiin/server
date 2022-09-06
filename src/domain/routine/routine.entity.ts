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

import { Manual } from '@domain/equipment/equipment-manual.entity';
import { RoutineProperties } from '@domain/routine/routine';
import { User } from '@domain/user/user.entity';

@Entity('routines')
export class Routine implements RoutineProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string | null;

  @ManyToOne(() => User, ({ routines }) => routines)
  @JoinColumn()
  author: User;

  @OneToMany(() => Manual, (manual) => manual.routine)
  manuals: Manual[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
