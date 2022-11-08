import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CommentCreateCommand,
  CommentCreateReplyCommand,
  CommentDeleteCommand,
  CommentQuery,
  CommentUpdateCommand,
} from '@app/community/comment/comment.command';
import { CommentProfileResponse } from '@app/community/comment/dtos/comment-profile.response';
import { PostService } from '@app/community/post/post.service';
import { UserService } from '@app/user/user.service';
import { Comment } from '@domain/community/comment.entity';
import { CommentNotFoundException } from '@domain/errors/community.errors';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  /**
   * 게시글의 댓글 목록을 조회합니다.
   */
  async getCommentsByPostId(data: {
    boardId: string;
    postId: string;
  }): Promise<CommentProfileResponse[]> {
    const post = await this.postService.getPostById({
      boardId: data.boardId,
      postId: data.postId,
    });

    const comments = await this.commentRepository.find({
      where: {
        post: { id: post.id },
      },
      order: {
        createdAt: 'ASC',
      },
      relations: ['author', 'post', 'childComment'],
    });

    return comments.map(
      (comment) =>
        new CommentProfileResponse({
          ...comment,
        }),
    );
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

  async createReplyComment(data: CommentCreateReplyCommand): Promise<Comment> {
    const { id: userId } = await this.userService.findById(data.userId);
    const { id: postId } = await this.postService.getPostById({
      postId: data.postId,
      boardId: data.boardId,
    });

    const parentComment = await this.commentRepository.findOneBy({
      id: data.replyId,
      post: { id: postId },
    });

    return await this.commentRepository.save({
      ...data,
      parentComment: { id: parentComment.id },
      post: { id: postId },
      author: { id: userId },
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
