import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Article } from '@domain/board/article.entity';

export class ArticleResponse {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  contents!: string;

  @IsNotEmpty()
  @IsNumber()
  likeCount!: number;

  @IsNotEmpty()
  @IsNumber()
  commentCount!: number;

  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;

  constructor(article: Article) {
    this.username = article.username;
    this.title = article.title;
    this.contents = article.contents;
    this.likeCount = article.likeCount;
    this.commentCount = article.commentCount;
    this.createdAt = article.createdAt;
  }
}
