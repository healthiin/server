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
  @ApiProperty()
  id: string;

  @ApiProperty({ description: '댓글 내용' })
  content: string;

  @ApiProperty({ description: '게시글 ID' })
  postId: string;

  @ApiProperty({ description: '부모 댓글' })
  replyId: string | null;

  @ApiProperty({ description: '댓글 작성자 닉네임' })
  author: string;

  @ApiProperty({ description: '대댓글' })
  childComments: CommentProfileResponse[] | null;

  @ApiProperty({ description: '댓글 작성일시' })
  createdAt: Date;

  @ApiProperty({ description: '댓글 수정일시' })
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
