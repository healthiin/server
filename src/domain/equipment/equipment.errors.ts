import { BadRequestException } from '@nestjs/common';

export const EQUIPMENT_ERRORS = {
  EQUIPMENT_NOT_FOUND: 'EQUIPMENT_NOT_FOUND',
  QR_GENERATION_FAILED: 'QR_GENERATION_FAILED',
};

export class EquipmentNotFoundException extends BadRequestException {
  constructor() {
    super(
      '해당 기구가 존재하지 않습니다.',
      EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND,
    );
  }
}

export class QrGenerationFailedException extends BadRequestException {
  constructor() {
    super(
      'QR 코드 생성에 실패했습니다.',
      EQUIPMENT_ERRORS.QR_GENERATION_FAILED,
    );
  }
}
