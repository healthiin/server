import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { PostCreateRequest } from '@app/community/post/dtos/post-create.request';
import { PostProfileUpdateRequest } from '@app/community/post/dtos/post-profile-update.request';
import { PostProfileResponse } from '@app/community/post/dtos/post-profile.response';
import { PostService } from '@app/community/post/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<PostProfileResponse[]> {
    return await this.postService.getPosts();
  }

  @Get('/board/:boardId')
  async getPostsByBoardId(
    @Param('boardId') boardId: string,
  ): Promise<PostProfileResponse[]> {
    return await this.postService.getPostsByBoardId(boardId);
  }

  @Get('/:postId')
  async getPostById(@Param('postId') postId: string): Promise<object> {
    return await this.postService.getPostById(postId);
  }

  @Post('/board/:boardId')
  async createPost(
    @Param('boardId') boardId: string,
    @Body() data: PostCreateRequest,
  ): Promise<object> {
    return await this.postService.createPost(boardId, data);
  }

  @Patch('/:postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body() data: PostProfileUpdateRequest,
  ): Promise<object> {
    return await this.postService.updatePost(postId, data);
  }

  @Delete('/:postId')
  async deletePost(postId: string): Promise<boolean> {
    return await this.postService.deletePost(postId);
  }
}
