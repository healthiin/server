import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { CommentUpdateCommand } from '@app/community/comment/comment.command';

export class CommentUpdateRequest
  implements Pick<CommentUpdateCommand, 'content'>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content!: string;
}
