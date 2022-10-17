import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { PostCreateCommand } from '@app/community/post/post.command';

export class PostCreateRequest
  implements
    Omit<PostCreateCommand, 'userId' | 'boardId' | 'postId' | 'images'>
{
  @ApiProperty({ description: '게시글 제목' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 내용' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
