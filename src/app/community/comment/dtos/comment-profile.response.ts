import { ApiProperty } from '@nestjs/swagger';

import { CommentProperties } from '@domain/community/comment';

export class CommentProfileResponse
  implements
    Omit<
      CommentProperties,
      | 'deletedAt'
      | 'author'
      | 'replyTo'
      | 'post'
      | 'parentComment'
      | 'childComment'
    >
{
  @ApiProperty({
    description: '댓글 ID입니다.',
    example: 'f7f8d877-fe0d-4e46-a05b-cf73ca411746',
  })
  id: string;

  @ApiProperty({ description: '댓글 내용입니다', example: '댓글 내용' })
  content: string;

  @ApiProperty({
    description: '게시글 ID입니다',
    example: '5a602b72-8192-4fc7-b5f8-a9e60f31674b',
  })
  postId: string;

  @ApiProperty({
    description: '댓글 작성자 닉네임입니다',
    example: '댓글 작성자 닉네임',
  })
  author: string;

  @ApiProperty({
    description: '대댓글',
    example: [
      {
        id: 'b5e15374-1859-450c-84e1-4846202bbd43',
        content: 'test1-1',
        createdAt: '2022-11-02T01:03:36.177Z',
        updatedAt: '2022-11-02T01:03:36.177Z',
        author: 'nickname2',
        childComments: null,
        postId: '5a602b72-8192-4fc7-b5f8-a9e60f31674b',
      },
    ],
  })
  childComments: CommentProfileResponse[] | null;

  @ApiProperty({
    description: '댓글 작성일시',
    example: '2022-11-02T01:03:36.177Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '댓글 수정일시',
    example: '2022-11-02T01:03:36.177Z',
  })
  updatedAt: Date;

  constructor(data: CommentProperties) {
    this.id = data.id;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.author = data.author.nickname;
    this.childComments = data.childComment
      ? data.childComment.map(
          (comment) =>
            new CommentProfileResponse({
              ...comment,
              post: data.post,
              author: comment.author,
            }),
        )
      : null;
    this.postId = data.post.id;
    this.author = data.author.nickname;
  }
}
