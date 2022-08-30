import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { CheckPolicies } from '@app/auth/authorization/policy.decorator';
import { Action } from '@app/auth/authorization/types';
import { CommentService } from '@app/community/comment/comment.service';
import { CommentCreateRequest } from '@app/community/comment/dtos/comment-create.request';
import { CommentProfileResponse } from '@app/community/comment/dtos/comment-profile.response';
import { CommentUpdateRequest } from '@app/community/comment/dtos/comment-update.request';
import { Comment } from '@domain/community/comment.entity';
import { COMMUNITY_ERRORS } from '@domain/errors/community.errors';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@Controller('boards/:boardId/posts/:postId/comments')
@UseGuards(JwtAuthGuard)
@ApiTags('[커뮤니티] 댓글')
@ApiBearerAuth()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({ summary: '댓글 목록을 조회합니다' })
  @ApiOkResponse({ type: [CommentProfileResponse] })
  async getCommentsByPostId(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<Pagination<CommentProfileResponse>> {
    return this.commentService.getCommentsByPostId({ page, limit, postId });
  }

  @Post()
  @ApiOperation({ summary: '댓글을 작성합니다' })
  @ApiCreatedResponse({ type: CommentProfileResponse })
  async createComment(
    @Req() { user }: Request,
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() data: CommentCreateRequest,
  ): Promise<CommentProfileResponse> {
    const comment = await this.commentService.createComment({
      boardId,
      postId,
      userId: user.id,
      ...data,
    });

    return new CommentProfileResponse(comment);
  }

  @Patch(':commentId')
  @CheckPolicies((ability) => ability.can(Action.Update, Comment))
  @ApiOperation({ summary: '댓글을 수정합니다' })
  @ApiOkResponse({ type: CommentProfileResponse })
  @ApiNotFoundResponse({ description: COMMUNITY_ERRORS.COMMENT_NOT_FOUND })
  async updateComment(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() data: CommentUpdateRequest,
  ): Promise<CommentProfileResponse> {
    const comment = await this.commentService.updateComment({
      boardId,
      postId,
      commentId,
      ...data,
    });

    return new CommentProfileResponse(comment);
  }

  @Delete(':commentId')
  @CheckPolicies((ability) => ability.can(Action.Delete, Comment))
  @ApiOperation({ summary: '댓글을 삭제합니다' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: COMMUNITY_ERRORS.COMMENT_NOT_FOUND })
  async deleteComment(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ): Promise<boolean> {
    return this.commentService.deleteComment({ boardId, postId, commentId });
  }
}
