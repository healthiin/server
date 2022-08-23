import { BadRequestException } from '@nestjs/common';

export const MANUAL_ERRORS = {
  EQUIPMENT_MANUAL_NOT_FOUND: 'EQUIPMENT_MANUAL_NOT_FOUND',
};

export class ManualNotFoundException extends BadRequestException {
  constructor() {
    super(
      '해당 기구에 한 해당 설명서 존재하지 않습니다.',
      MANUAL_ERRORS.EQUIPMENT_MANUAL_NOT_FOUND,
    );
  }
}
