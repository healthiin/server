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

import { Manual } from '@domain/equipment/equipment-manual.entity';
import { GymEquipment } from '@domain/gym/entities/gym-equipment.entity';

@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  enName!: string;

  @Column({ nullable: true })
  description?: string | null;

  @Column({ unique: true, nullable: true })
  qrUrl?: string | null;

  @OneToMany(() => Manual, (manuals) => manuals)
  manuals!: Manual[];

  @ManyToOne(() => GymEquipment, ({ equipments }) => equipments)
  gymEquipment?: GymEquipment | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
