import { PostProperties } from '@domain/community/post';

type BoardInfo = { boardId: string };
type PostInfo = { postId: string };
type UserInfo = { userId: string };
type ImagesInfo = { images: string[] };

export type PostQuery = BoardInfo & PostInfo;

export type PostListQuery = {
  page: number;
  limit: number;
  boardId: string;
};

export type HotPostListQuery = {
  page: number;
  limit: number;
};

export type PostCreateCommand = UserInfo &
  BoardInfo &
  ImagesInfo &
  Pick<PostProperties, 'title' | 'content'>;

export type PostUpdateCommand = PostQuery & Partial<PostCreateCommand>;

export type PostDeleteCommand = PostQuery;

export type postPreviewType = Omit<
  PostProperties,
  'content' | 'updatedAt' | 'deletedAt'
>;
