import { BadRequestException } from '@nestjs/common';

export const EQUIPMENT_ERRORS = {
  EQUIPMENT_NOT_FOUND: 'EQUIPMENT_NOT_FOUND',
};

export class EquipmentNotFoundException extends BadRequestException {
  constructor() {
    super(
      '해당 기구가 존재하지 않습니다.',
      EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND,
    );
  }
}
export class EquipmentManualNotFoundException extends BadRequestException {
  constructor() {
    super(
      '해당 기구에 대한 설명서가 존재하지 않습니다.',
      EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND,
    );
  }
}
export class EquipmentManualNotFoundException extends BadRequestException {
  constructor() {
    super(
      '해당 기구에 대한 설명서가 존재하지 않습니다.',
      EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND,
    );
  }
}
