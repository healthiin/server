import { ApiProperty } from '@nestjs/swagger';

import { CommentProperties } from '@domain/community/comment';
import { Comment } from '@domain/community/comment.entity';

export class CommentProfileResponse
  implements Omit<CommentProperties, 'deletedAt' | 'author'>
{
  @ApiProperty()
  id: string;

  @ApiProperty({ description: '댓글 내용' })
  content: string;

  @ApiProperty({ description: '댓글 작성자 닉네임' })
  author: string;

  @ApiProperty({ description: '댓글 작성일시' })
  createdAt: Date;

  @ApiProperty({ description: '댓글 수정일시' })
  updatedAt: Date;

  constructor(data: Comment) {
    Object.assign(this, data);
    this.author = data.author.nickname;
  }
}
