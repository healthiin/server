import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BoardService } from '@app/community/board/board.service';
import {
  PostCreateCommand,
  PostDeleteCommand,
  PostQuery,
  PostUpdateCommand,
} from '@app/community/post/post.command';
import { PostNotFoundException } from '@domain/community/community.errors';
import { Post } from '@domain/community/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly boardService: BoardService,
  ) {}

  /**
   * 게시글을 ID로 조회합니다.
   */
  async getPostById(data: PostQuery): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        id: data.postId,
        board: { id: data.boardId },
      },
      relations: ['author'],
    });

    if (!post) {
      throw new PostNotFoundException();
    }

    return post;
  }

  /**
   * 새 게시글을 작성합니다.
   */
  async createPost(data: PostCreateCommand): Promise<Post> {
    const board = await this.boardService.getBoardById(data.boardId);

    return this.postRepository.save({
      ...data,
      board: { id: board.id },
      author: { id: data.userId },
    });
  }

  /**
   * 게시글을 수정합니다.
   */
  async updatePost(data: PostUpdateCommand): Promise<Post> {
    const { id: boardId } = await this.boardService.getBoardById(data.boardId);
    const post = await this.getPostById({
      postId: data.postId,
      boardId,
    });

    return this.postRepository.save({
      ...post,
      ...data,
    });
  }

  /**
   * 게시글을 삭제합니다.
   */
  async deletePost(data: PostDeleteCommand): Promise<boolean> {
    const { id: boardId } = await this.boardService.getBoardById(data.boardId);
    const post = await this.getPostById({
      postId: data.postId,
      boardId,
    });

    const { affected } = await this.postRepository.softDelete({ id: post.id });
    return affected > 0;
  }
}
