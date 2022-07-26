import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { ArticleService } from '@app/article/article.service';
import { ArticleCreateRequest } from '@app/article/dtos/article-create.request';
import { ArticlePreviewResponse } from '@app/article/dtos/article-preview.response';
import { ArticleUpdateRequest } from '@app/article/dtos/article-update.request';
import { ArticleResponse } from '@app/article/dtos/article.response';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getAllArticles(): Promise<ArticlePreviewResponse[]> {
    return this.articleService.getAllArticles();
  }
  @Get(':category')
  async getArticlesByCategory(
    @Param('category')
    category: 'general' | 'question' | 'record' | 'information',
  ): Promise<ArticlePreviewResponse[]> {
    return this.articleService.getArticlesByCategory(category);
  }

  @Get(':id')
  async getArticle(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArticleResponse> {
    return this.articleService.getArticle(id);
  }

  @Post()
  async createArticle(@Body() data: ArticleCreateRequest): Promise<string> {
    return this.articleService.createArticle(data);
  }

  @Patch(':id')
  async updateArticle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: ArticleUpdateRequest,
  ): Promise<string> {
    return this.articleService.updateArticle(id, data);
  }

  @Delete(':id')
  async withdrawArticle(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return this.articleService.withdrawArticle(id);
  }
}
