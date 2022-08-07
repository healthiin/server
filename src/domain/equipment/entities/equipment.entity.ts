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

  @Column({ unique: true })
  title!: string;

  @Column({ unique: true })
  enTitle!: string;

  @Column({ type: String, nullable: true })
  description?: string | null;

  @OneToMany(() => EquipmentManual, ({ equipment }) => equipment)
  manuals!: EquipmentManual[];

  @ManyToOne(() => GymEquipment, ({ equipment }) => equipment)
  gymEquipment: GymEquipment;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
