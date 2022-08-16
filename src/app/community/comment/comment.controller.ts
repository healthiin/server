import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { CommentService } from '@app/community/comment/comment.service';

@Controller('comments/:boardId')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(): Promise<object> {
    return this.commentService.getComments();
  }

  @Post()
  async createComment(): Promise<object> {
    return this.commentService.createComment();
  }

  @Post('/:commentId')
  async createReComment(): Promise<object> {
    return this.commentService.createReComment();
  }

  @Patch()
  async updateComment(): Promise<object> {
    return this.commentService.updateComment();
  }

  @Delete()
  async deleteComment(): Promise<object> {
    return this.commentService.deleteComment();
  }
}
