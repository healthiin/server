import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MealNutrients, MealProperties, MealType } from '@domain/meal/meal';
import { User } from '@domain/user/user.entity';
import { JsonbTransformer } from '@infrastructure/helpers/jsonb.helper';

@Entity('meals')
export class Meal implements MealProperties {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ enum: MealType })
  type!: MealType;

  @Column({ type: 'date' })
  date!: Date;

  @Column()
  title!: string;

  @Column({ type: 'uuid' })
  photoId!: string;

  @Column({ type: String, transformer: new JsonbTransformer<MealNutrients>() })
  nutrients!: MealNutrients;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, ({ meals }) => meals)
  user!: User;
}
