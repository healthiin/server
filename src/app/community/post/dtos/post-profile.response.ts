import { ApiProperty } from '@nestjs/swagger';

import { PostProperties } from '@domain/community/post';
import { Post } from '@domain/community/post.entity';

export class PostProfileResponse
  implements Omit<PostProperties, 'author' | 'deletedAt'>
{
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  author!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  constructor(data: Post) {
    Object.assign(this, data);
    this.author = data.author.nickname;
  }
}
