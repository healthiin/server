import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GymEquipment } from '@domain/gym/entities/gym-equipment.entity';
import { Manual } from '@domain/manual/manual.entity';

@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string | null;

  @OneToMany(() => Manual, (manual) => manual)
  @JoinColumn()
  manuals!: Manual[];

  @OneToMany(() => GymEquipment, ({ equipment }) => equipment)
  @JoinColumn()
  gymEquipment!: GymEquipment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
