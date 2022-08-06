import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GymNotice } from '@domain/gym/entities/gym-notice.entity';
import { GymUser } from '@domain/gym/entities/gym-user.entity';

@Entity('gyms')
export class Gym {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: String, nullable: true })
  description!: string | null;

  @Column({ type: String, nullable: true })
  location!: string | null;

  @Column({ type: String, nullable: true })
  contact!: string | null;

  @OneToMany(() => GymUser, ({ gym }) => gym)
  users!: GymUser[];

  @OneToMany(() => GymNotice, ({ gym }) => gym)
  notices!: GymNotice[];

  @Column({ enum: String, nullable: true })
  equipments: string[] | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
