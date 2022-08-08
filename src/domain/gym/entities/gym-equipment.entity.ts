import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Equipment } from '@domain/equipment/entities/equipment.entity';
import { Gym } from '@domain/gym/entities/gym.entity';

@Entity('gyms_equipment')
export class GymEquipment {
  @PrimaryColumn()
  @ManyToOne(() => Gym, ({ equipments }) => equipments)
  gym!: Gym;

  @PrimaryColumn()
  @OneToMany(() => Equipment, ({ gymEquipment }) => gymEquipment)
  equipments!: Equipment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
