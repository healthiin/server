import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '@app/auth/authorization/authorization.module';
import { CommentController } from '@app/community/comment/comment.controller';
import { CommentService } from '@app/community/comment/comment.service';
import { PostModule } from '@app/community/post/post.module';
import { UserModule } from '@app/user/user.module';
import { Comment } from '@domain/community/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    AuthorizationModule,
    PostModule,
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
