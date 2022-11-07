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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  FileFastifyInterceptor,
  FilesFastifyInterceptor,
} from 'fastify-file-interceptor';
import { memoryStorage } from 'multer';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { CheckPolicies } from '@app/auth/authorization/policy.decorator';
import { PoliciesGuard } from '@app/auth/authorization/policy.guard';
import { Action } from '@app/auth/authorization/types';
import { PostCreateRequest } from '@app/community/post/dtos/post-create.request';
import { PostPreviewResponse } from '@app/community/post/dtos/post-preview.response';
import { PostProfileResponse } from '@app/community/post/dtos/post-profile.response';
import { PostUpdateRequest } from '@app/community/post/dtos/post-update.request';
import { PostService } from '@app/community/post/post.service';
import { MealInspectRequest } from '@app/meal/dtos/meal-inspect.request';
import { Post as PostEntity } from '@domain/community/post.entity';
import { COMMUNITY_ERRORS } from '@domain/errors/community.errors';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@Controller('boards/:boardId/posts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('[커뮤니티] 게시글')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: '게시글 목록을 조회합니다' })
  @ApiOkResponse({ type: [PostPreviewResponse] })
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

  @Post('image-upload')
  @UseInterceptors(FileFastifyInterceptor('file', { storage: memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '이미지를 업로드 합니다.',
    description: '이미지를 업로드하고 이미지 ID를 제공받습니다.',
  })
  @ApiBody({
    type: MealInspectRequest,
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return this.postService.uploadImage(file.buffer);
  }

  @Post()
  @UseInterceptors(
    FilesFastifyInterceptor('files', 10, { storage: memoryStorage() }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '게시글을 작성합니다' })
  @ApiCreatedResponse({ type: PostProfileResponse })
  async createPost(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() data: PostCreateRequest,
    @UploadedFile()
    files: Array<Express.Multer.File>,
    @Req() { user }: Request,
  ): Promise<PostProfileResponse> {
    const post = await this.postService.createPost({
      ...data,
      userId: user.id,
      boardId,
      images: data.images,
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
    @Req() { user }: Request,
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() data: PostUpdateRequest,
  ): Promise<PostProfileResponse> {
    const post = await this.postService.updatePost({
      boardId,
      postId,
      userId: user.id,
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

  @Post(':postId/like')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Update, PostEntity))
  @ApiOperation({ summary: '게시글을 좋아요합니다' })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: COMMUNITY_ERRORS.POST_NOT_FOUND })
  async likePost(
    @Req() { user }: Request,
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<boolean> {
    return this.postService.hitLike({ boardId, postId, userId: user.id });
  }
}
