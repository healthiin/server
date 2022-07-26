import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  category!: 'general' | 'question' | 'record' | 'information';

  @Column()
  username!: string;

  @Column()
  title!: string;

  @Column()
  contents!: string;

  @Column({ nullable: true })
  thumbnail!: string | null;

  @Column()
  likeCount!: number;

  @Column()
  commentCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
