import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PostUpdateCommand } from '@app/community/post/post.command';

export class PostUpdateRequest
  implements Omit<PostUpdateCommand, 'boardId' | 'postId'>
{
  @ApiPropertyOptional({ description: '게시글 제목' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: '게시글 내용' })
  @IsOptional()
  @IsString()
  content?: string;
}
