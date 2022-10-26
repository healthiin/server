import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Routine } from '@domain/routine/routine.entity';
import { User } from '@domain/user/user.entity';

@Entity('routine_likes')
export class RoutineLike {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Routine, ({ likes }) => likes)
  routine: Routine;

  @ManyToOne(() => User, ({ routineLikes }) => routineLikes)
  user: User;
}
