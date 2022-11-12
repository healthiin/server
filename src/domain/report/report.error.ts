import { NotFoundException } from '@nestjs/common';

export const REPORT_ERROR = {
  NOT_FOUND: 'REPORT_NOT_FOUND',
};

export class ReportNotFoundException extends NotFoundException {
  constructor() {
    super(REPORT_ERROR, '리포트를 찾을 수 없습니다');
  }
}
