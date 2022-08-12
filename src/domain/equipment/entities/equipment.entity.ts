import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Manual } from '@domain/equipment/entities/manual.entity';

@Entity('equipments')
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string | null;

  @OneToMany(() => Manual, (manual) => manual)
  manuals!: Manual[];

  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
  @DeleteDateColumn()
  deletedAt!: Date | null;
}
