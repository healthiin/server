import { NotFoundException } from '@nestjs/common';

export const GYM_ERRORS = {
  NOT_FOUND: 'GYM_NOT_FOUND',
  NOTICE_NOT_FOUND: 'GYM_NOTICE_NOT_FOUND',
};

export class GymNotFoundException extends NotFoundException {
  constructor() {
    super(GYM_ERRORS.NOT_FOUND, '헬스장을 찾을 수 없습니다.');
  }
}

export class GymNoticeNotFoundException extends NotFoundException {
  constructor() {
    super(GYM_ERRORS.NOTICE_NOT_FOUND, '존재하지 않는 게시글입니다.');
  }
}
