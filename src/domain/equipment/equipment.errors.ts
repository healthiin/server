import { BadRequestException, ConflictException } from '@nestjs/common';

export const EQUIPMENT_ERRORS = {
  DUPLICATED_TITLE: 'DUPLICATED_TITLE',
  DUPLICATED_ENTITLE: 'DUPLICATED_ENTITLE',
  EQUIPMENT_NOT_FOUND: 'EQUIPMENT_NOT_FOUND',
};

export class DuplicatedTitleException extends ConflictException {
  constructor() {
    super('이미 존재하는 기구명입니다.', EQUIPMENT_ERRORS.DUPLICATED_TITLE);
  }
}

export class DuplicatedEnTitleException extends ConflictException {
  constructor() {
    super(
      '이미 존재하는 영어 기구명입니다.',
      EQUIPMENT_ERRORS.DUPLICATED_ENTITLE,
    );
  }
}

export class EquipmentNotFoundException extends BadRequestException {
  constructor() {
    super(
      '해당 기구가 존재하지 않습니다.',
      EQUIPMENT_ERRORS.EQUIPMENT_NOT_FOUND,
    );
  }
}
