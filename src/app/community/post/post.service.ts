import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

import { BoardService } from '@app/community/board/board.service';
import { PostPreviewResponse } from '@app/community/post/dtos/post-preview.response';
import {
  PostCreateCommand,
  PostDeleteCommand,
  PostListQuery,
  PostQuery,
  PostUpdateCommand,
} from '@app/community/post/post.command';
import { UserService } from '@app/user/user.service';
import { PostImage } from '@domain/community/post-image.entity';
import { Post } from '@domain/community/post.entity';
import { PostNotFoundException } from '@domain/errors/community.errors';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostImage)
    private readonly postImageRepository: Repository<PostImage>,
    private readonly boardService: BoardService,
    private readonly userService: UserService,
  ) {}

  /**
   * 게시글 목록을 조회합니다.
   */
  async getPostsByBoardId(
    data: PostListQuery,
  ): Promise<Pagination<PostPreviewResponse>> {
    const { items, meta } = await paginate(
      this.postRepository,
      {
        page: data.page,
        limit: data.limit,
      },
      {
        where: {
          board: { id: data.boardId },
        },
        relations: ['author'],
      },
    );

    return {
      items: items.map((item) => new PostPreviewResponse({ ...item })),
      meta,
    };
  }

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
    const user = await this.userService.findById(data.userId);
    const images = await this.postImageRepository.save(
      data.images.map((image) =>
        this.postImageRepository.create({ url: image }),
      ),
    );

    const test = this.postRepository.save({
      title: data.title,
      content: data.content,
      board: { id: board.id },
      author: { id: user.id },
      images,
    });
    console.log(await test);
    return test;
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
    const images = await this.postImageRepository.save(
      data.images.map((image) =>
        this.postImageRepository.create({ url: image }),
      ),
    );

    return this.postRepository.save({
      ...post,
      ...data,
      images,
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
