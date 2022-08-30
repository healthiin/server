import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import {
  CommentCreateCommand,
  CommentDeleteCommand,
  CommentListQuery,
  CommentQuery,
  CommentUpdateCommand,
} from '@app/community/comment/comment.command';
import { CommentProfileResponse } from '@app/community/comment/dtos/comment-profile.response';
import { PostService } from '@app/community/post/post.service';
import { Comment } from '@domain/community/comment.entity';
import { CommentNotFoundException } from '@domain/errors/community.errors';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  /**
   * 게시글의 댓글 목록을 조회합니다.
   */
  async getCommentsByPostId(
    data: CommentListQuery,
  ): Promise<Pagination<CommentProfileResponse>> {
    const { items, meta } = await paginate(
      this.commentRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        where: {
          post: { id: data.postId },
        },
      },
    );

    return {
      items: items.map((item) => new CommentProfileResponse(item)),
      meta,
    };
  }

  /**
   * 댓글을 ID로 조회합니다.
   */
  async getCommentById(data: CommentQuery): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: {
        id: data.commentId,
        post: { id: data.postId },
      },
    });

    if (!comment) {
      throw new CommentNotFoundException();
    }

    return comment;
  }

  /**
   * 새로운 댓글을 작성합니다.
   */
  async createComment(data: CommentCreateCommand): Promise<Comment> {
    const { id: postId } = await this.postService.getPostById({
      postId: data.postId,
      boardId: data.boardId,
    });

    return this.commentRepository.save({
      ...data,
      post: { id: postId },
      author: { id: data.userId },
    });
  }

  /**
   * 댓글을 수정합니다.
   */
  async updateComment(data: CommentUpdateCommand): Promise<Comment> {
    const comment = await this.getCommentById({
      commentId: data.commentId,
      postId: data.postId,
      boardId: data.boardId,
    });

    return this.commentRepository.save({
      ...comment,
      ...data,
    });
  }

  /**
   * 댓글을 삭제합니다.
   */
  async deleteComment(data: CommentDeleteCommand): Promise<boolean> {
    const comment = await this.getCommentById({
      commentId: data.commentId,
      postId: data.postId,
      boardId: data.boardId,
    });

    const { affected } = await this.commentRepository.softDelete({
      id: comment.id,
    });

    return affected > 0;
  }
}
