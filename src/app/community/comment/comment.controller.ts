import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CommentService } from '@app/community/comment/comment.service';

@Controller('comments/:PostId')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComments(@Param('PostId', ParseUUIDPipe) PostId: string) {
    return undefined;
    // return this.commentService.getComments(PostId);
  }

  @Post()
  async createComment(@Param('PostId', ParseUUIDPipe) PostId: string) {
    return undefined;
    // return this.commentService.createComment(PostId);
  }

  @Post('/:commentId')
  async createReComment(@Param('PostId', ParseUUIDPipe) PostId: string) {
    return undefined;
    // return this.commentService.createReComment(PostId);
  }

  @Patch()
  async updateComment(@Param('PostId', ParseUUIDPipe) PostId: string) {
    return undefined;
    // return this.commentService.updateComment(PostId);
  }

  @Delete()
  async deleteComment(@Param('PostId', ParseUUIDPipe) PostId: string) {
    return undefined;
    // return this.commentService.deleteComment(PostId);
  }
}
