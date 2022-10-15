import { NotFoundException } from '@nestjs/common';

export const MEAL_ERRORS = {
  NOT_FOUND: 'MEAL_NOT_FOUND',
};

export class MealNotFoundException extends NotFoundException {
  constructor() {
    super('식단 메뉴를 찾을 수 없습니다.', MEAL_ERRORS.NOT_FOUND);
  }
}
