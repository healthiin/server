import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardModule } from '@app/community/board/board.module';
import { PostController } from '@app/community/post/post.controller';
import { PostService } from '@app/community/post/post.service';
import { Post } from '@domain/community/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), BoardModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
