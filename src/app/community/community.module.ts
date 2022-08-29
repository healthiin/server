import { Module } from '@nestjs/common';

import { BoardModule } from '@app/community/board/board.module';
import { CommentModule } from '@app/community/comment/comment.module';
import { PostModule } from '@app/community/post/post.module';

@Module({
  imports: [BoardModule, PostModule, CommentModule],
})
export class CommunityModule {}
