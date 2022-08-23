import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from '@app/community/post/post.controller';
import { PostService } from '@app/community/post/post.service';
import { Board } from '@domain/community/entities/board.entity';
import { Post } from '@domain/community/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Board])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
