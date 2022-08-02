import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Manager } from '@domain/manager/manager.entity';
import { Manual } from '@domain/manual/manual.entity';

@Entity('gyms')
export class Gym {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Manager, (manager) => manager.id)
  manager!: string;

  @Column()
  gymName!: string;

  @Column()
  address!: string;

  @Column()
  franchise!: string | null;

  @OneToMany(() => Manual, (manual) => manual.id)
  equipments!: Manual[];

  @Column()
  gymInfo!: string;
}
