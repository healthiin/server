import { ConflictException, NotFoundException } from '@nestjs/common';

export const GYM_ERRORS = {
  GYM_NOT_FOUND: 'GYM_NOT_FOUND',
  DUPULICATED_EQUIPMENT: 'DUPULICATED_EQUIPMENT',
};

export class GymNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 헬스장입니다.', GYM_ERRORS.GYM_NOT_FOUND);
  }
}

export class DuplicatedEquipmentException extends ConflictException {
  constructor() {
    super('이미 등록된 장비입니다.', GYM_ERRORS.DUPULICATED_EQUIPMENT);
  }
}
