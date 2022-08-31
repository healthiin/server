import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GymProperties } from '@domain/gym/entities/gym';
import { GymEquipment } from '@domain/gym/entities/gym-equipment.entity';
import { GymNotice } from '@domain/gym/entities/gym-notice.entity';
import { GymUser } from '@domain/gym/entities/gym-user.entity';

@Entity('gyms')
export class Gym implements GymProperties {
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

  @OneToMany(() => GymEquipment, ({ gym }) => gym)
  equipments: GymEquipment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
