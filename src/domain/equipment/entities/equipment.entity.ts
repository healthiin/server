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

  @Column({ unique: true })
  title!: string;

  @Column({ unique: true })
  enTitle!: string;

  @Column({ type: String, nullable: true })
  description!: string | null;

  @OneToMany(() => Manual, ({ equipment }) => equipment, { nullable: true })
  manual!: Manual[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
