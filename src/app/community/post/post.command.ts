import { PostProperties } from '@domain/community/post';

type BoardInfo = { boardId: string };
type PostInfo = { postId: string };
type UserInfo = { userId: string };

export type PostQuery = BoardInfo & PostInfo;

export type PostListQuery = {
  page: number;
  limit: number;
  boardId: string;
};

export type PostCreateCommand = UserInfo &
  BoardInfo &
  Pick<PostProperties, 'title' | 'content'>;

export type PostUpdateCommand = PostQuery & Partial<PostCreateCommand>;

export type PostDeleteCommand = PostQuery;
