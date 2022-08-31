import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('routine')
export class RoutineController {
  @Get()
  async getRoutines() {
    return '모든 운동 루틴을 반환한다.';
  }

  @Get('/:id')
  async getRoutine(@Param('id', ParseUUIDPipe) id: string) {
    return `특정 아이디 ${id} 루틴 하나를 반환한다.`;
  }

  @Post()
  async createRoutine() {
    return '운동 루틴을 추가할 수 있다.';
  }

  @Patch('/:id')
  async updateRoutine(@Param('id', ParseUUIDPipe) id: string) {
    return `특정 아이디 ${id} 루틴 하나를 업데이트한다.`;
  }

  @Delete('/:id')
  async withdrawRoutine(@Param('id', ParseUUIDPipe) id: string) {
    return `특정 아이디 ${id} 루틴 하나를 소프트 삭제한다.`;
  }
}
