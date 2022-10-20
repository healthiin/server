import { ApiProperty } from '@nestjs/swagger';

import { postPreviewType } from '@app/community/post/post.command';
import { PostProperties } from '@domain/community/post';

export class PostPreviewResponse
  implements
    Omit<
      PostProperties,
      'author' | 'deletedAt' | 'content' | 'images' | 'updatedAt' | 'board'
    >
{
  @ApiProperty()
  id!: string;

  @ApiProperty({ description: '게시글 제목' })
  title!: string;

  @ApiProperty({ description: '게시글 작성자 닉네임' })
  author!: string;

  @ApiProperty({ description: '게시글 좋아요 수' })
  likesCount!: number;

  @ApiProperty({ description: '게시글 댓글 수' })
  commentsCount!: number;

  @ApiProperty({ description: '게시글 조회수' })
  views!: number;

  @ApiProperty({ description: '이미지 존재 여부' })
  hasImages!: boolean;

  @ApiProperty({ description: '게시글 작성 일시' })
  createdAt!: Date;

  constructor(data: postPreviewType) {
    this.id = data.id;
    this.title = data.title;
    this.views = data.views;
    this.author = data.author.nickname;
    this.hasImages = data.images.length > 0;
  }
}
