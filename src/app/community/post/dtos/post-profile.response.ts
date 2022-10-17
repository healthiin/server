import { ApiProperty } from '@nestjs/swagger';

import { PostProperties } from '@domain/community/post';
import { PostImage } from '@domain/community/post-image.entity';

export class PostProfileResponse
  implements Omit<PostProperties, 'author' | 'deletedAt' | 'board' | 'images'>
{
  @ApiProperty()
  id!: string;

  @ApiProperty({ description: '게시글 제목' })
  title!: string;

  @ApiProperty({ description: '게시글 내용' })
  content!: string;

  @ApiProperty({ description: '게시글 작성자 닉네임' })
  author!: string;

  @ApiProperty({ description: '게시글 이미지' })
  images!: string[] | null;

  @ApiProperty({ description: '게시글 좋아요 수' })
  likesCount!: number;

  @ApiProperty({ description: '게시글 댓글 수' })
  commentsCount!: number;

  @ApiProperty({ description: '게시판 아이디' })
  boardId!: string;

  @ApiProperty({ description: '이미지 존재 여부' })
  hasImages!: boolean;

  @ApiProperty({ description: '게시글 작성 일시' })
  createdAt!: Date;

  @ApiProperty({ description: '게시글 수정 일시' })
  updatedAt!: Date;
  constructor(data: PostProperties) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.author = data.author.nickname;
    this.images = data.images.map((image: PostImage) => image.url);
    this.author = data.author.nickname;
    this.boardId = data.board.id;
  }
}
