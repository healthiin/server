import { Module } from '@nestjs/common';

import { BoardModule } from '@app/community/board/board.module';

@Module({
  imports: [BoardModule],
})
export class CommunityModule {}
