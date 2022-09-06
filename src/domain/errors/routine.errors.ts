import { NotFoundException } from '@nestjs/common';

export const ROUTINE_ERRORS = {
  ROUTINE_NOT_FOUND: 'ROUTINE_NOT_FOUND',
};

export class RoutineNotFoundException extends NotFoundException {
  constructor() {
    super('존재하지 않는 루틴입니다.', ROUTINE_ERRORS.ROUTINE_NOT_FOUND);
  }
}
