import {
  BadRequestException,
  ConflictException,
  NotAcceptableException,
} from '@nestjs/common';

export const USER_ERRORS = {
  DUPLICATED_USERNAME: 'DUPLICATED_USERNAME',
  DUPLICATED_NICKNAME: 'DUPLICATED_NICKNAME',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_NICKNAME_LENGTH: 'INVALID_NICKNAME_LENGTH',
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

export class UserNotFoundException extends BadRequestException {
  constructor() {
    super('사용자를 찾을 수 없습니다.', USER_ERRORS.USER_NOT_FOUND);
  }
}

export class InvalidNicknameLength extends NotAcceptableException {
  constructor() {
    super(
      '닉네임의 길이가 올바르지 않습니다.',
      USER_ERRORS.INVALID_NICKNAME_LENGTH,
    );
  }
}
