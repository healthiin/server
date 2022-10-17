import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Post } from '@domain/community/post.entity';

@Entity('post_images')
export class PostImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Post, ({ images }) => images)
  post!: Post;

  @Column()
  url!: string;
}
