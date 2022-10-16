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
import { PoliciesGuard } from '@app/auth/authorization/policy.guard';
import { Action } from '@app/auth/authorization/types';
import { PostCreateRequest } from '@app/community/post/dtos/post-create.request';
import { PostProfileResponse } from '@app/community/post/dtos/post-profile.response';
import { PostUpdateRequest } from '@app/community/post/dtos/post-update.request';
import { PostService } from '@app/community/post/post.service';
import { Post as PostEntity } from '@domain/community/post.entity';
import { COMMUNITY_ERRORS } from '@domain/errors/community.errors';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@Controller('boards/:boardId/posts')
@UseGuards(JwtAuthGuard)
@ApiTags('[커뮤니티] 게시글')
@ApiBearerAuth()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: '특정 게시판의 게시글 목록을 조회합니다' })
  @ApiOkResponse({ type: [PostProfileResponse] })
  async getPostsByBoardId(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Param('boardId', ParseUUIDPipe) boardId: string,
  ): Promise<Pagination<PostPreviewResponse>> {
    return this.postService.getPostsByBoardId({ page, limit, boardId });
  }

  @Get(':postId')
  @ApiOperation({ summary: '게시글 내용을 조회합니다' })
  @ApiOkResponse({ type: PostProfileResponse })
  async getPostProfile(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<PostProfileResponse> {
    const post = await this.postService.getPostById({ boardId, postId });
    return new PostProfileResponse(post);
  }

  @Post()
  @ApiOperation({ summary: '게시글을 작성합니다' })
  @ApiCreatedResponse({ type: PostProfileResponse })
  async createPost(
    @Req() { user }: Request,
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() data: PostCreateRequest,
  ): Promise<PostProfileResponse> {
    const post = await this.postService.createPost({
      userId: user.id,
      boardId,
      ...data,
    });
    return new PostProfileResponse(post);
  }

  @Patch(':postId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Update, PostEntity))
  @ApiOperation({ summary: '게시글을 수정합니다' })
  @ApiOkResponse({ type: PostProfileResponse })
  @ApiNotFoundResponse({ description: COMMUNITY_ERRORS.POST_NOT_FOUND })
  async editPost(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() data: PostUpdateRequest,
  ): Promise<PostProfileResponse> {
    const post = await this.postService.updatePost({
      boardId,
      postId,
      ...data,
    });
    return new PostProfileResponse(post);
  }

  @Delete(':postId')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Delete, PostEntity))
  @ApiOperation({ summary: '게시글을 삭제합니다' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: COMMUNITY_ERRORS.POST_NOT_FOUND })
  async deletePost(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<boolean> {
    return this.postService.deletePost({ boardId, postId });
  }
}
