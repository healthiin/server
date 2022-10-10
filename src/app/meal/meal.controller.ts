import {
  Body,
  Controller,
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
import { MealInspectRequest } from '@app/meal/dtos/meal-inspect.request';
import { MealInspectResponse } from '@app/meal/dtos/meal-inspect.response';
import { MealMenuCreateRequest } from '@app/meal/dtos/meal-menu-create.request';
import { MealMenuProfileResponse } from '@app/meal/dtos/meal-menu-profile.response';
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
    return this.mealService.inspectIngredients(user.id, file.buffer);
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
}
