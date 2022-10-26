import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@app/auth/authentication/jwt.guard';
import { CheckPolicies } from '@app/auth/authorization/policy.decorator';
import { PoliciesGuard } from '@app/auth/authorization/policy.guard';
import { Action } from '@app/auth/authorization/types';
import { MyRoutineCreateRequest } from '@app/routine/routine-core/dtos/my-routine-create.request';
import { MyRoutinePreviewResponse } from '@app/routine/routine-core/dtos/my-routine-preview.response';
import { MyRoutineProfileResponse } from '@app/routine/routine-core/dtos/my-routine-profile.response';
import { ReferenceRoutineCreateRequest } from '@app/routine/routine-core/dtos/reference-routine-create.request';
import { ReferenceRoutinePreviewResponse } from '@app/routine/routine-core/dtos/reference-routine-preview.response';
import { ReferenceRoutineProfileResponse } from '@app/routine/routine-core/dtos/reference-routine-profile.response';
import { RoutineUpdateRequest } from '@app/routine/routine-core/dtos/routine-update.request';
import { RoutineCoreService } from '@app/routine/routine-core/routine-core.service';
import { RoutineManualProfileResponse } from '@app/routine/routine-manual/dtos/routine-manual-profile.response';
import { ManualType } from '@domain/equipment/manual-type';
import { Routine as RoutineEntity } from '@domain/routine/routine.entity';
import { Pagination } from '@infrastructure/types/pagination.types';
import { Request } from '@infrastructure/types/request.types';

@Controller('routines')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('[메뉴얼] 루틴')
export class RoutineCoreController {
  constructor(private readonly routineService: RoutineCoreService) {}

  @Get('/:routineId')
  @ApiOperation({ summary: '특정 레퍼런스 루틴의 내용을 조회합니다' })
  @ApiOkResponse({ type: ReferenceRoutineProfileResponse })
  async getReferenceRoutineProfile(
    @Param('routineId', ParseUUIDPipe) routineId: string,
  ): Promise<ReferenceRoutineProfileResponse> {
    return await this.routineService.getReferenceRoutineProfile(routineId);
  }

  @Get()
  @ApiOperation({
    summary: '레퍼런스 루틴 목록을 조회합니다',
    description: '페이지 네이션으로 반환됩니다.',
  })
  @ApiOkResponse({
    type: ReferenceRoutinePreviewResponse,
    description: '공개된 루틴들입니다. 페이지네이션으로 반환됩니다.',
  })
  async getReferenceRoutines(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<ReferenceRoutinePreviewResponse>> {
    return this.routineService.getReferenceRoutines({ page, limit });
  }

  @Get('/my-routines')
  @ApiOperation({
    summary: '내 루틴 목록을 조회합니다',
  })
  @ApiOkResponse({
    type: MyRoutinePreviewResponse,
  })
  async getMyRoutines(
    @Req() { user }: Request,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<MyRoutinePreviewResponse[]> {
    return this.routineService.getMyRoutines({
      userId: user.id,
      page,
      limit,
    });
  }

  @Get('/my-routines/:routineId')
  @ApiOperation({ summary: '내 루틴의 내용을 조회합니다' })
  @ApiOkResponse({ type: MyRoutineProfileResponse })
  @ApiOperation({ summary: '내 루틴의 내용을 조회합니다' })
  async getMyRoutineProfile(
    @Req() { user }: Request,
    @Param('routineId', ParseUUIDPipe) routineId: string,
  ): Promise<MyRoutineProfileResponse> {
    return await this.routineService.getMyRoutineProfile({
      userId: user.id,
      routineId,
    });
  }

  @Post()
  @ApiOperation({
    summary: '루틴을 생성합니다',
  })
  @ApiOkResponse({
    type: ReferenceRoutineProfileResponse,
    description:
      '첫 루틴 생성 시에는 루틴 메뉴얼이 비어있습니다. 루틴 메뉴얼 POST API를 통해서 루틴 메뉴얼을 추가할 수 있습니다.',
  })
  async createRoutine(
    @Req() { user }: Request,
    @Body()
    data: ReferenceRoutineCreateRequest,
  ): Promise<ReferenceRoutineProfileResponse> {
    return await this.routineService.createRoutine({
      userId: user.id,
      ...data,
    });
  }

  // @Post('/copy/:routineId')
  // @ApiOperation({ summary: '레퍼런스 루틴을 나의 루틴으로 복사합니다' })
  // @ApiOkResponse({ type: MyRoutineProfileResponse })
  // async copyRoutine(
  //   @Req() { user }: Request,
  //   @Param('routineId', ParseUUIDPipe) routineId: string,
  //   @Body() data: { days: number[] },
  // ): Promise<MyRoutineProfileResponse> {
  //   return await this.routineService.copyRoutine({
  //     userId: user.id,
  //     routineId,
  //     days: data.days,
  //   });
  // }

  @Post('/my-routines')
  @ApiOperation({
    summary: '내 루틴을 생성합니다',
  })
  @ApiOkResponse({
    type: MyRoutineProfileResponse,
  })
  async createMyRoutine(
    @Req() { user }: Request,
    @Body() data: MyRoutineCreateRequest,
  ): Promise<MyRoutineProfileResponse> {
    return await this.routineService.createMyRoutine({
      userId: user.id,
      ...data,
    });
  }

  // @Patch('/:routineId')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability) => ability.can(Action.Update, RoutineEntity))
  // @ApiOperation({ summary: '루틴을 수정합니다' })
  // @ApiOkResponse({ type: MyRoutineProfileResponse })
  // async editRoutineProfile(
  //   @Param('routineId', ParseUUIDPipe) routineId: string,
  //   @Req() { user }: Request,
  //   @Body() data: RoutineUpdateRequest,
  // ): Promise<MyRoutineProfileResponse> {
  //   return await this.routineService.editRoutine({
  //     routineId,
  //     userId: user.id,
  //     ...data,
  //   });
  // }

  // @Delete('/:routineId')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability) => ability.can(Action.Delete, RoutineEntity))
  // @ApiOperation({ summary: '루틴을 삭제합니다' })
  // @ApiOkResponse({ type: Boolean })
  // async deleteRoutine(
  //   @Param('routineId', ParseUUIDPipe) routineId: string,
  // ): Promise<boolean> {
  //   return this.routineService.deleteRoutine({ routineId });
  // }
}
