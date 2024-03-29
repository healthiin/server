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

import { RoutineProperties } from '@domain/routine/routine';
import { RoutineLike } from '@domain/routine/routine-like.entity';
import { RoutineLog } from '@domain/routine/routine-log.entity';
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

  @ManyToOne(() => User, (routines) => routines)
  author!: User;

  @Column()
  day!: number;

  @ManyToOne(() => User, ({ routines }) => routines)
  owner!: User;

  @OneToMany(() => RoutineManual, ({ routine }) => routine)
  routineManuals!: RoutineManual[];

  @Column()
  status!: 'public' | 'private';

  @Column({ type: 'int', default: 0 })
  likeCount!: number;

  @OneToMany(() => RoutineLike, ({ routine }) => routine, { lazy: true })
  likes!: RoutineLike[];

  @OneToMany(() => RoutineLog, ({ routine }) => routine)
  logs!: RoutineLog[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
