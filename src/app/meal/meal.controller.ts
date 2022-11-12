import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { memoryStorage } from 'multer';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { MealDailyReportResponse } from '@app/meal/dtos/meal-daily-report.response';
import { MealInspectRequest } from '@app/meal/dtos/meal-inspect.request';
import { MealInspectResponse } from '@app/meal/dtos/meal-inspect.response';
import { MealMenuCreateRequest } from '@app/meal/dtos/meal-menu-create.request';
import { MealMenuProfileResponse } from '@app/meal/dtos/meal-menu-profile.response';
import { MealMenuUpdateRequest } from '@app/meal/dtos/meal-menu-update.request';
import { MealService } from '@app/meal/meal.service';
import { Request } from '@infrastructure/types/request.types';

@Controller('meals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('[기록] 식단')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Post('inspect')
  @UseInterceptors(FileFastifyInterceptor('file', { storage: memoryStorage() }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '사진 기반의 영양분 예측을 수행합니다.',
    description: '영양분 예측 결과는 상위 3개까지 제공합니다.',
  })
  @ApiBody({
    type: MealInspectRequest,
  })
  @ApiOkResponse({ type: MealInspectResponse })
  async inspectIngredients(
    @Req() { user }: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<MealInspectResponse> {
    console.log(file, file.filename);
    return this.mealService.inspectIngredients(user.id, file.buffer);
  }

  @Get(':date')
  @ApiOperation({ summary: '일별 식단을 조회합니다.' })
  @ApiOkResponse({ type: MealDailyReportResponse })
  async getDailyMeal(
    @Param('date') date: string,
    @Req() { user }: Request,
  ): Promise<MealDailyReportResponse> {
    return this.mealService.getDailyMeal(date, user.id);
  }

  @Post()
  @ApiOperation({ summary: '식단 메뉴를 등록합니다.' })
  @ApiOkResponse({ type: MealMenuProfileResponse })
  async createMealMenu(
    @Body() data: MealMenuCreateRequest,
    @Req() { user }: Request,
  ): Promise<MealMenuProfileResponse> {
    const result = await this.mealService.createMealMenu({
      userId: user.id,
      ...data,
    });
    return new MealMenuProfileResponse(result);
  }

  @Patch(':mealId')
  @ApiOperation({ summary: '식단 메뉴를 수정합니다.' })
  @ApiOkResponse({ type: MealMenuProfileResponse })
  async updateMealMenu(
    @Param('mealId', ParseUUIDPipe) mealId: string,
    @Body() data: MealMenuUpdateRequest,
  ): Promise<MealMenuProfileResponse> {
    const result = await this.mealService.updateMealMenu(mealId, data);
    return new MealMenuProfileResponse(result);
  }

  @Delete(':mealId')
  @ApiOperation({ summary: '식단 메뉴를 삭제합니다.' })
  @ApiOkResponse({ type: Boolean })
  async deleteMealMenu(
    @Param('mealId', ParseUUIDPipe) mealId: string,
  ): Promise<boolean> {
    return this.mealService.deleteMealMenu(mealId);
  }
}
