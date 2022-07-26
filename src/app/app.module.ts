import { Module } from '@nestjs/common';

import { ArticleModule } from '@app/article/article.module';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [UserModule, AuthModule, ArticleModule],
})
export class AppModule {}
