import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Gym } from '@domain/gym/entities/gym.entity';
import { User } from '@domain/user/user.entity';

export enum GymUserRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  CUSTOMER = 'CUSTOMER',
}

@Entity('gym_users')
export class GymUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Gym, ({ users }) => users)
  gym!: Gym;

  @ManyToOne(() => User, ({ gyms }) => gyms)
  user!: User;

  @Column({ enum: GymUserRole, default: GymUserRole.CUSTOMER })
  role!: GymUserRole;

  @CreateDateColumn()
  createdAt!: Date;

  isAdmin(): boolean {
    return [GymUserRole.OWNER, GymUserRole.MANAGER].includes(this.role);
  }

  isCustomer(): boolean {
    return [GymUserRole.CUSTOMER].includes(this.role);
  }
}
