import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Gym } from '@domain/gym/gym.entity';
import { Manager } from '@domain/manager/manager.entity';
import { User } from '@domain/user/user.entity';

@Entity('notices')
export class Notice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  contents!: string;

  @OneToMany(() => User, (user) => user.id)
  reader!: User[];

  @ManyToOne(() => Manager, (manager) => manager.id)
  writer!: Manager;

  @ManyToOne(() => Gym, (gym) => gym.id)
  gym: Gym;

  @CreateDateColumn()
  CreatedAt!: string;
}
