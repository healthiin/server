import { PostProfileResponse } from '@app/community/post/dtos/post-profile.response';
import { UserProfileResponse } from '@app/user/dtos/user-profile.response';
import { Comment } from '@domain/community/entities/comment.entity';
import { Post } from '@domain/community/entities/post.entity';
import { User } from '@domain/user/user.entity';

export class CommentResponse {
  private id!: string;
  private content: string;
  private parentCommentId: Comment | null;
  private user: User;
  private post: Post;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(comment: Comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.parentCommentId = comment.parentCommentId;
    this.user = new User();
    this.post = new Post();
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }
}
