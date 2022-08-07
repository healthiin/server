import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Equipment } from '@domain/equipment/entities/equipment.entity';

export class Manual {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: true })
  title!: string;

  @Column({ nullable: true })
  enTitle!: string;

  @Column()
  type: '등' | '팔' | '다리' | '가슴' | '복근' | '유산소' | '어깨' | '하체';

  @Column()
  difficulty: number;

  @Column({ type: String, nullable: true })
  description!: string | null;

  @Column({
    type: String,
    nullable: true,
    comment: '기구 사용에 대한 주의사항',
  })
  precautions: string | null;

  @ManyToOne(() => Equipment, ({ manuals }) => manuals)
  equipment!: Equipment;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
