import { Module } from '@nestjs/common';

import { BoardModule } from '@app/community/board/board.module';
import { PostModule } from '@app/community/post/post.module';

@Module({
  imports: [BoardModule, PostModule],
})
export class CommunityModule {}
