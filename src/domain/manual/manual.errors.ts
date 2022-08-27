import { BadRequestException } from '@nestjs/common';

export const MANUAL_ERRORS = {
  MANUAL_NOT_FOUND: 'MANUAL_NOT_FOUND',
};

export class ManualNotFoundExeption extends BadRequestException {
  constructor() {
    super('운동을 찾지 못했습니다.');
  }
}
