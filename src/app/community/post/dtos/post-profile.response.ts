import { Post } from '@domain/community/entities/post.entity';

export class PostProfileResponse {
  id!: string;
  private title!: string;
  private content!: string;
  private createdAt!: Date;
  private updatedAt!: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}
