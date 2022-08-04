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

import { Manager } from '@domain/manager/manager.entity';
import { Manual } from '@domain/manual/manual.entity';
import { User } from '@domain/user/user.entity';

@Entity('gyms')
export class Gym {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Manager, (manager) => manager.ManagingGyms)
  manager!: string;

  @Column()
  gymName!: string;

  @Column({ unique: true })
  address!: string;

  @Column({ nullable: true })
  franchise: string | null;

  @OneToMany(() => Manual, (manual) => manual.id, { nullable: true })
  equipments!: Manual[];

  @OneToMany(() => User, (user) => user.registeredGym, {
    nullable: true,
    cascade: true,
  })
  registeredUsers!: User[];

  @Column({ nullable: true })
  gymInfo!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
