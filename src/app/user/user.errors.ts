import { ConflictException } from '@nestjs/common';

export const USER_ERRORS = {
  DUPLICATED_USERNAME: 'DUPLICATED_USERNAME',
  DUPLICATED_NICKNAME: 'DUPLICATED_NICKNAME',
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
