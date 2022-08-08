import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Equipment } from '@domain/equipment/entities/equipment.entity';

export const enum EquipmentManualType {
  back = '등',
  arm = '팔',
  legs = '다리',
  chest = '가슴',
  abs = '복근',
  cardio = '유산소',
  shoulder = '어깨',
  lower = '하체',
}

@Entity('equipment_manuals')
export class EquipmentManual {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  title!: string;

  @Column({ unique: true })
  enTitle!: string;

  @Column()
  type!: EquipmentManualType;

  @Column()
  difficulty!: number;

  @Column({ type: String, nullable: true })
  description!: string | null;

  @Column({
    type: String,
    nullable: true,
    comment: '기구 사용에 대한 주의사항',
  })
  precautions: string | null;

  @ManyToOne(() => Equipment, ({ manuals }) => manuals)
  equipments!: Equipment;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
