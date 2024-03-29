import { NotFoundException } from '@nestjs/common';

export const ROUTINE_ERRORS = {
  ROUTINE_NOT_FOUND: 'ROUTINE_NOT_FOUND',
  ROUTINE_MANUAL_NOT_FOUND: 'ROUTINE_MANUAL_NOT_FOUND',
  ROUTINE_LOG_NOT_FOUND: 'ROUTINE_LOG_NOT_FOUND',
};

export class RoutineNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 루틴입니다.', ROUTINE_ERRORS.ROUTINE_NOT_FOUND);
  }
}

export class RoutineManualNotFoundException extends NotFoundException {
  constructor() {
    super(
      '존재하지 않는 루틴 메뉴얼입니다.',
      ROUTINE_ERRORS.ROUTINE_MANUAL_NOT_FOUND,
    );
  }
}

export class RoutineLogNotFoundException extends NotFoundException {
  constructor() {
    super(
      '존재하지 않는 루틴 기록입니다.',
      ROUTINE_ERRORS.ROUTINE_LOG_NOT_FOUND,
    );
  }
}
