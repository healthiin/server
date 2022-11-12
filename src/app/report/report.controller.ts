import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { ReportCreateRequest } from '@app/report/dtos/report-create.request';
import { ReportProfileResponse } from '@app/report/dtos/report-profile.response';
import { ReportService } from '@app/report/report.service';
import { Request } from '@infrastructure/types/request.types';

@Controller('reports')
@ApiTags('[계정] 리포트')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '내 리포트 목록을 조회합니다' })
  async getReports(@Req() { user }: Request): Promise<ReportProfileResponse[]> {
    const reports = await this.reportService.getReports(user.id);
    return reports.map((report) => new ReportProfileResponse(report));
  }

  @Get(':reportId')
  @ApiOperation({ summary: '주간 리포트를 조회합니다.' })
  async getWeeklyReport(@Param('reportId', ParseUUIDPipe) reportId: string) {
    return this.reportService.generateReport(reportId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '리포트 생성을 요청합니다.' })
  async createReport(
    @Body() data: ReportCreateRequest,
    @Req() { user }: Request,
  ): Promise<ReportProfileResponse> {
    const result = await this.reportService.createReport({
      year: data.year,
      week: data.week,
      userId: user.id,
    });

    return new ReportProfileResponse(result);
  }
}
