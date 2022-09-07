import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GymUserProperties } from '@domain/gym/entities/gym-user';
import { Gym } from '@domain/gym/entities/gym.entity';
import { User } from '@domain/user/user.entity';

export enum GymUserRole {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  CUSTOMER = 'CUSTOMER',
}

@Entity('gym_users')
export class GymUser implements GymUserProperties {
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

  @DeleteDateColumn()
  deletedAt!: Date | null;

  isAdmin(): boolean {
    return [GymUserRole.OWNER, GymUserRole.MANAGER].includes(this.role);
  }

  isCustomer(): boolean {
    return [GymUserRole.CUSTOMER].includes(this.role);
  }
}
