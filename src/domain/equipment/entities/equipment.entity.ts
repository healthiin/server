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

import { EquipmentManual } from '@domain/equipment/entities/equipment-manual.entity';
import { GymEquipment } from '@domain/gym/entities/gym-equipment.entity';

@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  enTitle!: string;

  @Column({ type: String, nullable: true })
  description!: string | null;

  @OneToMany(() => EquipmentManual, ({ equipments }) => equipments)
  manuals!: EquipmentManual[];

  @ManyToOne(() => GymEquipment, ({ equipments }) => equipments)
  gymEquipment!: GymEquipment;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
