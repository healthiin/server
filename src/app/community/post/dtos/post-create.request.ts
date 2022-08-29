import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { PostCreateCommand } from '@app/community/post/post.command';

export class PostCreateRequest
  implements Omit<PostCreateCommand, 'userId' | 'boardId' | 'postId'>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
