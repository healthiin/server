import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { PostService } from '@app/community/post/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(): Promise<object[]> {
    return await this.postService.getPosts();
  }

  @Get('/:boardId')
  async getPostsByBoardId(boardId: string): Promise<object[]> {
    return await this.postService.getPostsByBoardId(boardId);
  }

  @Get('/:postId')
  async getPostById(postId: string): Promise<object> {
    return await this.postService.getPostById(postId);
  }

  @Post()
  async createPost(): Promise<object> {
    return await this.postService.createPost();
  }

  @Patch('/:postId')
  async updatePost(postId: string): Promise<object> {
    return await this.postService.updatePost(postId);
  }

  @Delete('/:postId')
  async deletePost(postId: string): Promise<boolean> {
    return await this.postService.deletePost(postId);
  }
}
