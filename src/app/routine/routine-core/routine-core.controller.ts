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
import { RoutineCoreService } from '@app/routine/routine-core/routine-core.service';
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

  // @Get('/:routineId')
  // @ApiOperation({ summary: '특정 루틴의 내용을 조회합니다' })
  // @ApiOkResponse({ type: RoutineProfileResponse })
  // async getRoutineProfile(
  //   @Param('routineId', ParseUUIDPipe) routineId: string,
  // ): Promise<RoutineProfileResponse> {
  //   const routine = await this.routineService.getRoutineById(routineId);
  //   const days = this.routineService.getDays(routine.day);
  //   return new RoutineProfileResponse({ ...routine, days });
  // }

  // @Get()
  // @ApiOperation({ summary: '루틴 목록을 조회합니다' })
  // @ApiOkResponse({ type: RoutineProfileResponse })
  // async getRoutines(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  //   @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  // ): Promise<Pagination<RoutineProfileResponse>> {
  //   return this.routineService.getRoutines({ page, limit });
  // }

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

  // @Get('/type/:manualType')
  // @ApiOperation({ summary: '타입을 통해 루틴 목록을 조회합니다' })
  // @ApiOkResponse({ type: RoutineProfileResponse })
  // async getRoutinesByType(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  //   @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  //   @Param('manualType') manualType: ManualType,
  // ): Promise<Pagination<RoutineProfileResponse>> {
  //   return this.routineService.getRoutinesByType({ page, limit }, manualType);
  // }

  @Post()
  @ApiOperation({ summary: '루틴을 생성합니다' })
  @ApiOkResponse({ type: RoutineProfileResponse })
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
    return new RoutineProfileResponse({ ...routine, days });
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
