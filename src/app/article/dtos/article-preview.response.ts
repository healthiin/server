import { IsNotEmpty, IsString } from 'class-validator';

import { Article } from '@domain/board/article.entity';

export class ArticlePreviewResponse {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  thumbnail!: string;

  constructor(article: Article) {
    this.id = article.id;
    this.username = article.username;
    this.title = article.title;
    this.thumbnail = article.thumbnail;
  }
}
