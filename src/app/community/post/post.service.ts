import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { BoardService } from '@app/community/board/board.service';
import { PostPreviewResponse } from '@app/community/post/dtos/post-preview.response';
import {
  PostCreateCommand,
  PostDeleteCommand,
  PostListQuery,
  PostQuery,
  PostUpdateCommand,
} from '@app/community/post/post.command';
import { PhotoClient } from '@app/meal/types/photo.client';
import { UserService } from '@app/user/user.service';
import { PostLike } from '@domain/community/post-like.entity';
import { Post } from '@domain/community/post.entity';
import { PostNotFoundException } from '@domain/errors/community.errors';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostLike)
    private readonly postLikeRepository: Repository<PostLike>,
    @Inject('PostPhotoClient')
    private readonly postPhotoClient: PhotoClient,
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
        relations: ['author', 'board'],
        order: { createdAt: 'DESC' },
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
      relations: ['author', 'board'],
    });

    if (!post) {
      throw new PostNotFoundException();
    }
    await this.postRepository.increment({ id: post.id }, 'views', 1);

    return post;
  }

  /**
   * 새 게시글을 작성합니다.
   */
  async createPost(data: PostCreateCommand): Promise<Post> {
    const board = await this.boardService.getBoardById(data.boardId);
    const user = await this.userService.findById(data.userId);

    return this.postRepository.save({
      title: data.title,
      content: data.content,
      board: { id: board.id },
      author: { id: user.id },
      images: data.images,
    });
  }

  /**
   * 이미지를 업로드합니다.
   */
  async uploadImage(photo: Buffer): Promise<string> {
    const resizedPhoto = await this.postPhotoClient.resizePhoto(photo);
    return await this.postPhotoClient.uploadPhoto(resizedPhoto);
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

    const user = await this.userService.findById(data.userId);

    return this.postRepository.save({
      ...post,
      title: data.title,
      content: data.content,
      board: { id: boardId },
      author: { id: user.id },
      images: data.images,
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

  async findByPostId(
    postId: string,
    select?: FindOptionsSelect<Post>,
  ): Promise<Post> {
    return this.postRepository.findOne({
      where: {
        id: postId,
      },
      select,
      relations: ['author', 'board'],
    });
  }

  /**
   * 게시글에 좋아요를 누릅니다.
   */
  async hitLike(data: {
    boardId: string;
    userId: string;
    postId: string;
  }): Promise<boolean> {
    const user = await this.userService.findById(data.userId);
    const post = await this.findByPostId(data.postId);

    const hitUser = await this.postLikeRepository.findOne({
      where: {
        user: { id: user.id },
        post: { id: post.id },
      },
      relations: ['user', 'post'],
    });

    if (!hitUser) {
      await this.postLikeRepository.save({
        user: { id: user.id },
        post: { id: post.id },
      });
      await this.postRepository.increment({ id: post.id }, 'likesCount', 1);
      return true;
    }
    return false;
  }
}
