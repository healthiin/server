import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Equipment } from '@domain/equipment/entities/equipment.entity';
import { Gym } from '@domain/gym/entities/gym.entity';

@Entity('gyms_equipment')
export class GymEquipment {
  @PrimaryColumn('uuid')
  @ManyToOne(() => Gym, ({ equipments }) => equipments)
  gym!: Gym;

  @PrimaryColumn()
  @ManyToOne(() => Equipment, ({ gymEquipment }) => gymEquipment)
  equipment!: Equipment;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
