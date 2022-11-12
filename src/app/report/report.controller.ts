import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getWeek } from 'date-fns';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { ReportService } from '@app/report/report.service';
import { Request } from '@infrastructure/types/request.types';

@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('[계정] 리포트')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':year/:week')
  @ApiOperation({ summary: '주간 리포트를 조회합니다.' })
  async getWeeklyReport(
    @Param('year', new DefaultValuePipe(new Date().getFullYear()), ParseIntPipe)
    year: number,
    @Param('week', new DefaultValuePipe(getWeek(new Date())), ParseIntPipe)
    week: number,
    @Req()
    { user }: Request,
  ) {
    return this.reportService.getWeeklyReport({
      year,
      week,
      userId: user.id,
    });
  }
}
