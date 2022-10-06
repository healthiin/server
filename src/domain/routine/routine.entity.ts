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

import { RoutineProperties } from '@domain/routine/routine';
import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { User } from '@domain/user/user.entity';

@Entity('routines')
export class Routine implements RoutineProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string | null;

  @ManyToOne(() => User, ({ routines }) => routines)
  @JoinColumn()
  author!: User;

  @OneToMany(() => RoutineManual, (routineManual) => routineManual.routine)
  routineManuals!: RoutineManual[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
