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
import { RoutineCreateRequest } from '@app/routine/routine-core/dtos/routine-create.request';
import { RoutineProfileResponse } from '@app/routine/routine-core/dtos/routine-profile.response';
import { RoutineUpdateRequest } from '@app/routine/routine-core/dtos/routine-update.request';
import { RoutinePreviewResponse } from '@app/routine/routine-core/dtos/routine.preview.response';
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
  @ApiOperation({ summary: '특정 루틴의 내용을 조회합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
  async getRoutineProfile(
    @Param('routineId', ParseUUIDPipe) routineId: string,
  ): Promise<RoutineProfileResponse> {
    const routine = await this.routineService.getRoutineById(routineId);
    const days = this.routineService.getDays(routine.day);
    const types = routine.routineManuals.map(
      (routineManual) => routineManual.manual.type,
    );
    return new RoutineProfileResponse({
      ...routine,
      routineManuals: routine.routineManuals.map(
        (routineManual) =>
          new RoutineManualProfileResponse({
            ...routineManual,
            type: routineManual.manual.type,
          }),
      ),
      types,
      days,
    });
  }

  @Get()
  @ApiOperation({ summary: '공개 루틴 목록을 조회합니다' })
  @ApiOkResponse({
    type: RoutinePreviewResponse,
    description: '공개된 루틴들입니다. 페이지네이션으로 반환됩니다.',
  })
  async getRoutines(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<RoutinePreviewResponse>> {
    return this.routineService.getRoutines({ page, limit });
  }

  // @Get('/my-routines')
  // @ApiOperation({ summary: '나의 루틴 목록을 조회합니다' })
  // @ApiOkResponse({ type: RoutineProfileResponse })
  // async getMyRoutines(
  //   @Req() { user }: Request,
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  //   @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  // ): Promise<Pagination<RoutineProfileResponse>> {
  //   return this.routineService.getMyRoutines({ userId: user.id, page, limit });
  // }

  @Post()
  @ApiOperation({
    summary: '루틴을 생성합니다',
  })
  @ApiOkResponse({
    type: RoutineProfileResponse,
    description:
      '첫 루틴 생성 시에는 루틴 메뉴얼이 비어있습니다. 루틴 메뉴얼 POST API를 통해서 루틴 메뉴얼을 추가할 수 있습니다.',
  })
  async createRoutine(
    @Req() { user }: Request,
    @Body()
    data: RoutineCreateRequest,
  ): Promise<RoutineProfileResponse> {
    const routine = await this.routineService.createRoutine({
      userId: user.id,
      ...data,
    });
    const days = this.routineService.getDays(routine.day);
    const types = routine.routineManuals.map(
      (routineManual) => routineManual.manual.type,
    );

    return new RoutineProfileResponse({
      ...routine,
      routineManuals: routine.routineManuals.map(
        (routineManual) =>
          new RoutineManualProfileResponse({
            ...routineManual,
            type: routineManual.manual.type,
          }),
      ),
      days,
      types,
    });
  }

  // @Post('/copy/:routineId')
  // @ApiOperation({ summary: '루틴을 복사합니다' })
  // @ApiOkResponse({ type: RoutineProfileResponse })
  // async copyRoutine(
  //   @Req() { user }: Request,
  //   @Param('routineId', ParseUUIDPipe) routineId: string,
  // ): Promise<RoutineProfileResponse> {
  //   const routine = await this.routineService.copyRoutine({
  //     userId: user.id,
  //     routineId,
  //   });
  //   const days = this.routineService.getDays(routine.day);
  //
  //   return new RoutineProfileResponse({ ...routine, days });
  // }
  // @Patch('/:routineId')
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability) => ability.can(Action.Update, RoutineEntity))
  // @ApiOperation({ summary: '루틴을 수정합니다' })
  // @ApiOkResponse({ type: RoutineProfileResponse })
  // async editRoutineProfile(
  //   @Param('routineId', ParseUUIDPipe) routineId: string,
  //   @Req() { user }: Request,
  //   @Body() data: RoutineUpdateRequest,
  // ): Promise<RoutineProfileResponse> {
  //   const routine = await this.routineService.editRoutine({
  //     routineId,
  //     userId: user.id,
  //     ...data,
  //   });
  //   const days = this.routineService.getDays(routine.day);
  //
  //   // return new RoutineProfileResponse({ ...routine, days });
  // }
  //
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
