import { BadRequestException, ConflictException } from '@nestjs/common';

export const USER_ERRORS = {
  DUPLICATED_USERNAME: 'DUPLICATED_USERNAME',
  DUPLICATED_NICKNAME: 'DUPLICATED_NICKNAME',
  BAD_REQ: 'BAD_REQ',
};

export class DuplicatedUsernameException extends ConflictException {
  constructor() {
    super('이미 사용중인 아이디입니다.', USER_ERRORS.DUPLICATED_USERNAME);
  }
}

export class DuplicatedNicknameException extends ConflictException {
  constructor() {
    super('이미 사용중인 닉네임입니다.', USER_ERRORS.DUPLICATED_NICKNAME);
  }
}
export class ValidationUUIDException extends BadRequestException {
  constructor() {
    super('사용자를 찾을 수 없습니다.', USER_ERRORS.BAD_REQ);
  }
}
