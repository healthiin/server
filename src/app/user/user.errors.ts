import { BadRequestException, ConflictException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

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

@ValidatorConstraint({ async: true })
export class ValidationError implements ValidatorConstraintInterface {
  validate(nickname: string, args: ValidationArguments) {
    return nickname.length > 2 && nickname.length < 10;
  }
}

export function NicknameLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidationError,
    });
  };
}
