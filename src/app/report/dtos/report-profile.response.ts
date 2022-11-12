import { ApiProperty } from '@nestjs/swagger';

import { Report } from '@domain/report/report.entity';

export class ReportProfileResponse {
  @ApiProperty({ description: '리포트 ID' })
  id: string;

  @ApiProperty({ description: '리포트 제목' })
  title: string;

  @ApiProperty({ description: '기준 연도' })
  year: number;

  @ApiProperty({ description: '기준 주차' })
  week: number;

  constructor(data: Report) {
    this.id = data.id;
    this.title = data.title;
    this.year = data.year;
    this.week = data.week;
  }
}
