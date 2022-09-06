import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @OneToMany(() => Manual, (manual) => manual)
  manuals!: Manual[];

  @OneToMany(() => GymEquipment, ({ equipment }) => equipment)
  gymEquipment!: GymEquipment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
