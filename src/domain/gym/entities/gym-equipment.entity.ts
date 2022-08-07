import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Equipment } from '@domain/equipment/entities/equipment.entity';
import { Gym } from '@domain/gym/entities/gym.entity';

@Entity('gyms_equipment')
export class GymEquipment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Gym, ({ equipments }) => equipments)
  gym!: Gym;

  @OneToMany(() => Equipment, ({ gymEquipment }) => gymEquipment)
  equipment!: Equipment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
