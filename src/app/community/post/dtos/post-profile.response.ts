import { ApiProperty } from '@nestjs/swagger';

import { PostProperties } from '@domain/community/post';
import { Post } from '@domain/community/post.entity';

export class PostProfileResponse
  implements Omit<PostProperties, 'author' | 'deletedAt'>
{
  @ApiProperty()
  id!: string;

  @ApiProperty({ description: '게시글 제목' })
  title!: string;

  @ApiProperty({ description: '게시글 내용' })
  content!: string;

  @ApiProperty({ description: '게시글 작성자 닉네임' })
  author!: string;

  @ApiProperty({ description: '게시글 작성 일시' })
  createdAt!: Date;

  @ApiProperty({ description: '게시글 수정 일시' })
  updatedAt!: Date;

  constructor(data: Post) {
    Object.assign(this, data);
    this.author = data.author.nickname;
  }
}
