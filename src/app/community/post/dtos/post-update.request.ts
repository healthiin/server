import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { PostUpdateCommand } from '@app/community/post/post.command';

export class PostUpdateRequest
  implements Omit<PostUpdateCommand, 'boardId' | 'postId'>
{
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;
}
