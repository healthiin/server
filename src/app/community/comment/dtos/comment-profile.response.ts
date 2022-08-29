import { ApiProperty } from '@nestjs/swagger';

import { CommentProperties } from '@domain/community/comment';
import { Comment } from '@domain/community/comment.entity';

export class CommentProfileResponse
  implements Omit<CommentProperties, 'deletedAt' | 'author'>
{
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(data: Comment) {
    Object.assign(this, data);
    this.author = data.author.nickname;
  }
}
