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
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { BoardService } from '@app/community/board/board.service';
import { BoardCreateRequest } from '@app/community/board/dtos/board-create.request';
import { BoardProfileResponse } from '@app/community/board/dtos/board-profile.response';
import { BoardUpdateRequest } from '@app/community/board/dtos/board-update.request';
import { COMMUNITY_ERRORS } from '@domain/community/community.errors';
import { Pagination } from '@infrastructure/types/pagination.types';

@Controller('boards')
@ApiTags('Board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: '게시판 목록을 검색합니다.' })
  @ApiOkResponse({ type: [BoardProfileResponse] })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  async searchBoards(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Pagination<BoardProfileResponse>> {
    return this.boardService.searchBoard(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시판 정보를 조회합니다.' })
  @ApiOkResponse({ type: BoardProfileResponse })
  @ApiNotFoundResponse({ description: COMMUNITY_ERRORS.BOARD_NOT_FOUND })
  async getBoardProfile(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BoardProfileResponse> {
    return this.boardService.getBoardProfile(id);
  }

  @Post()
  @ApiOperation({ summary: '게시판을 생성합니다.' })
  @ApiOkResponse({ type: BoardProfileResponse })
  @ApiConflictResponse({ description: COMMUNITY_ERRORS.BOARD_SLUG_DUPLICATED })
  async createBoard(
    @Body() data: BoardCreateRequest,
  ): Promise<BoardProfileResponse> {
    return this.boardService.createBoard(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시판 정보를 수정합니다.' })
  @ApiOkResponse({ type: BoardProfileResponse })
  @ApiNotFoundResponse({ description: COMMUNITY_ERRORS.BOARD_NOT_FOUND })
  @ApiConflictResponse({ description: COMMUNITY_ERRORS.BOARD_SLUG_DUPLICATED })
  async editBoardProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: BoardUpdateRequest,
  ): Promise<BoardProfileResponse> {
    return this.boardService.editBoardProfile(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시판을 삭제합니다.' })
  @ApiOkResponse({ type: BoardProfileResponse })
  @ApiNotFoundResponse({ description: COMMUNITY_ERRORS.BOARD_NOT_FOUND })
  async deleteBoard(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.boardService.deleteBoard(id);
  }
}
