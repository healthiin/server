import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { ArticleCreateData } from '@app/article/commands/article-create.data';
import { ArticlePreviewResponse } from '@app/article/dtos/article-preview.response';
import { ArticleUpdateRequest } from '@app/article/dtos/article-update.request';
import { ArticleResponse } from '@app/article/dtos/article.response';
import { Article } from '@domain/board/article.entity';
import { ArticleNotFoundExeption } from '@domain/board/article.errors';

export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getAllArticles(): Promise<ArticlePreviewResponse[]> {
    const articles = await this.articleRepository.find();

    return articles.map((article) => new ArticlePreviewResponse(article));
  }

  async getArticlesByCategory(
    category: 'general' | 'question' | 'record' | 'information',
  ): Promise<ArticlePreviewResponse[]> {
    console.log(category);
    const articles = await this.articleRepository.findBy({
      category,
    });
    return articles.map((article) => new ArticlePreviewResponse(article));
  }

  async getArticle(id: string): Promise<ArticleResponse> {
    const article = await this.findById(id);
    return new ArticleResponse(article);
  }

  async createArticle(data: ArticleCreateData): Promise<string> {
    const article = await this.articleRepository.save({
      ...data,
      likeCount: 0,
      commentCount: 0,
    });
    return article.id;
  }

  async updateArticle(id: string, data: ArticleUpdateRequest): Promise<string> {
    const article = this.findById(id);
    const updatedArticle = await this.articleRepository.save({
      ...article,
      ...data,
    });
    return updatedArticle.id;
  }

  async withdrawArticle(id: string): Promise<boolean> {
    const article = await this.findById(id);
    const { affected } = await this.articleRepository.softDelete(article.id);
    return affected > 0;
  }

  async findById(
    id: string,
    select?: FindOptionsSelect<Article>,
  ): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      select,
    });
    if (!article) throw new ArticleNotFoundExeption();
    return article;
  }
}
