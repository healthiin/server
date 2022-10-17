import { CommentProperties } from '@domain/community/comment';

type BoardInfo = { boardId: string };
type PostInfo = { postId: string };
type CommentInfo = { commentId: string };
type replyInfo = { replyId: string };
type UserInfo = { userId: string };

export type CommentQuery = BoardInfo & PostInfo & CommentInfo;

export type CommentListQuery = {
  page: number;
  limit: number;
  postId: string;
};

export type CommentCreateCommand = UserInfo &
  BoardInfo &
  PostInfo &
  Pick<CommentProperties, 'content'>;

export type CommentCreateReplyCommand = CommentCreateCommand & replyInfo;

export type CommentUpdateCommand = CommentQuery &
  Pick<CommentProperties, 'content'>;

export type CommentDeleteCommand = CommentQuery;
