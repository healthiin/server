import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { CreatePostData } from '@app/community/post/commands/create-post.data';
import { UpdatePostData } from '@app/community/post/commands/update-post.data';
import { PostProfileResponse } from '@app/community/post/dtos/post-profile.response';
import { PostNotFoundException } from '@domain/community/community.errors';
import { Board } from '@domain/community/entities/board.entity';
import { Post } from '@domain/community/entities/post.entity';

export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getPosts(): Promise<PostProfileResponse[]> {
    const posts = await this.postRepository.find();

    return posts.map((post) => new PostProfileResponse(post));
  }

  async getPostsByBoardId(boardId: string): Promise<PostProfileResponse[]> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    const posts = await this.postRepository.findBy({
      boardId: { id: board.id },
    });

    return posts.map((post) => new PostProfileResponse(post));
  }

  async getPostById(postId: string): Promise<PostProfileResponse> {
    const post = await this.findById(postId);
    if (!post) throw new PostNotFoundException();

    return new PostProfileResponse(post);
  }

  async createPost(
    boardId: string,
    data: CreatePostData,
  ): Promise<PostProfileResponse> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    const post = await this.postRepository.save({ ...data, boardId: board });

    return new PostProfileResponse(post);
  }

  async updatePost(
    postId: string,
    data: UpdatePostData,
  ): Promise<PostProfileResponse> {
    const post = await this.findById(postId);
    if (!post) throw new PostNotFoundException();

    const updatedPost = await this.postRepository.save({ ...post, ...data });

    return new PostProfileResponse(updatedPost);
  }

  async deletePost(postId: string): Promise<boolean> {
    const post = await this.findById(postId);
    if (!post) throw new PostNotFoundException();

    const { affected } = await this.postRepository.softDelete({ id: post.id });
    return affected > 0;
  }

  async findById(id: string, select?: FindOptionsSelect<Post>): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      select,
    });
    if (!post) throw new PostNotFoundException();

    return post;
  }
}
