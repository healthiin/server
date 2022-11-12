import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ReportProperties, ReportVisibility } from '@domain/report/report';
import { User } from '@domain/user/user.entity';

@Entity('reports')
export class Report implements ReportProperties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  year: number;

  @Column()
  week: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @Column({ enum: ReportVisibility, default: ReportVisibility.PUBLIC })
  visibility: ReportVisibility;

  @CreateDateColumn()
  createdAt: Date;
}
