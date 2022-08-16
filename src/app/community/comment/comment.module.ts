import { Module } from '@nestjs/common';

import { CommentController } from '@app/community/comment/comment.controller';
import { CommentService } from '@app/community/comment/comment.service';

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
