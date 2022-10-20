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
import { RoutineLog } from '@domain/routine/routine-log.entity';
import { RoutineManual } from '@domain/routine/routine-manual.entity';
import { RoutineType } from '@domain/routine/routine-type.entity';
import { User } from '@domain/user/user.entity';

@Entity('routines')
export class Routine implements RoutineProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string | null;

  @ManyToOne(() => User, (routines) => routines)
  @JoinColumn()
  author!: User;

  @Column()
  day!: number;

  @ManyToOne(() => User, ({ routines }) => routines)
  @JoinColumn()
  owner!: User;

  @OneToMany(() => RoutineManual, ({ routine }) => routine)
  routineManuals!: RoutineManual[];

  @Column()
  status!: 'public' | 'private';

  @OneToMany(() => RoutineType, ({ routine }) => routine)
  types!: RoutineType[];

  @OneToMany(() => RoutineLog, ({ routine }) => routine)
  logs!: RoutineLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
