import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { PostService } from '@app/community/post/post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get('/:boardId')
  async getPostsByBoardId(boardId: string) {
    return await this.postService.getPostsByBoardId(boardId);
  }

  @Get('/:postId')
  async getPostById(postId: string) {
    return await this.postService.getPostById(postId);
  }

  @Post()
  async createPost() {
    return await this.postService.createPost();
  }

  @Patch('/:postId')
  async updatePost(postId: string) {
    return await this.postService.updatePost(postId);
  }

  @Delete('/:postId')
  async deletePost(postId: string) {
    return await this.postService.deletePost(postId);
  }
}
