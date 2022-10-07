import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ManualType } from '@domain/equipment/equipment-type';
import { Routine } from '@domain/routine/routine.entity';

@Entity('routine_types')
export class RoutineType {
  @PrimaryGeneratedColumn('uuid')
  @ManyToOne(() => Routine, (routine) => routine.types)
  routine!: Routine;

  @Column()
  type!: ManualType;
}
