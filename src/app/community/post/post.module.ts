import { Module } from '@nestjs/common';

import { PostController } from '@app/community/post/post.controller';
import { PostService } from '@app/community/post/post.service';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
