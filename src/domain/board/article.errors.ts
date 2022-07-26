import { BadRequestException } from '@nestjs/common';

export const ARTICLE_ERRORS = {
  ARTICLE_NOT_FOUND: 'ARTICLE_NOT_FOUND',
};

export class ArticleNotFoundExeption extends BadRequestException {
  constructor() {
    super('잘못된 주소이거나 삭제된 글입니다.');
  }
}
