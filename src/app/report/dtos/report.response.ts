import { ApiProperty } from '@nestjs/swagger';

import { ReportItem } from '@app/report/report.commands';

export class ReportResponse {
  @ApiProperty({ description: '사용자 닉네임' })
  user: string;

  @ApiProperty({ description: '리포트 제목' })
  title: string;

  @ApiProperty({ description: '리포트' })
  result: Map<string, ReportItem>;
}
