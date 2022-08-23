import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CommentService } from '@app/community/comment/comment.service';
import { CommentCreateRequest } from '@app/community/comment/dtos/comment-create.request';

@Controller('comments/:postId')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<object> {
    return this.commentService.getComments(postId);
  }

  @Post()
  async createComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() data: CommentCreateRequest,
  ): Promise<object> {
    return this.commentService.createComment(postId, data);
  }

  @Patch()
  async updateComment(
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<object> {
    return this.commentService.updateComment(postId);
  }

  @Delete()
  async deleteComment(
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<object> {
    return this.commentService.deleteComment(postId);
  }
}
