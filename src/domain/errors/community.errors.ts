import { NotFoundException } from '@nestjs/common';

export const COMMUNITY_ERRORS = {
  BOARD_NOT_FOUND: 'BOARD_NOT_FOUND',
  BOARD_SLUG_DUPLICATED: 'BOARD_SLUG_DUPLICATED',
  POST_NOT_FOUND: 'POST_NOT_FOUND',
  COMMENT_NOT_FOUND: 'COMMENT_NOT_FOUND',
};

export class BoardNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 게시판입니다.', COMMUNITY_ERRORS.BOARD_NOT_FOUND);
  }
}

export class BoardSlugDuplicatedException extends NotFoundException {
  constructor() {
    super(
      '이미 존재하는 게시판 짧은 주소입니다.',
      COMMUNITY_ERRORS.BOARD_SLUG_DUPLICATED,
    );
  }
}

export class PostNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 게시글입니다.', COMMUNITY_ERRORS.POST_NOT_FOUND);
  }
}

export class CommentNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 댓글입니다.', COMMUNITY_ERRORS.COMMENT_NOT_FOUND);
  }
}
