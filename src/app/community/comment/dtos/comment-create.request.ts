import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CommentCreateCommand } from '@app/community/comment/comment.command';

export class CommentCreateRequest
  implements Pick<CommentCreateCommand, 'content'>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
