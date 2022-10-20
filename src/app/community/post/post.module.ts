import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@app/auth/authorization/authorization.module';
import { BoardModule } from '@app/community/board/board.module';
import { PostController } from '@app/community/post/post.controller';
import { PostService } from '@app/community/post/post.service';
import { UserModule } from '@app/user/user.module';
import { PostImage } from '@domain/community/post-image.entity';
import { PostLike } from '@domain/community/post-like.entity';
import { Post } from '@domain/community/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostImage, PostLike]),
    AuthorizationModule,
    BoardModule,
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
