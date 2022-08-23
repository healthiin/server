import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCommentData } from '@app/community/comment/commands/create-comment.data';
import { CommentResponse } from '@app/community/comment/dtos/comment.response';
import { PostService } from '@app/community/post/post.service';
import { Comment } from '@domain/community/entities/comment.entity';

export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  async getComments(postId: string): Promise<CommentResponse[]> {
    const post = await this.postService.getPostById(postId);
    const comments = await this.commentRepository.findBy({
      postId: { id: post.id },
    });

    return comments.map((comment) => new CommentResponse(comment));
  }

  async createComment(
    postId: string,
    data: CreateCommentData,
  ): Promise<CommentResponse> {
    const post = await this.postService.getPostById(postId);
    const comment = await this.commentRepository.save({
      ...data,
    });
    return new CommentResponse(comment);
  }

  async updateComment(): Promise<object> {
    return {};
  }

  async deleteComment(): Promise<object> {
    return {};
  }
}
