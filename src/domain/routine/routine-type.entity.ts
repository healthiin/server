// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
//
// import { ManualType } from '@domain/equipment/manual-type';
// import { Routine } from '@domain/routine/routine.entity';
//
// @Entity('routine_types')
// export class RoutineType {
//   @PrimaryGeneratedColumn('uuid')
//   @ManyToOne(() => Routine, ({ types }) => types)
//   routine!: Routine;
//
//   @Column()
//   type!: ManualType;
// }
