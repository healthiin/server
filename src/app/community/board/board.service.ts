import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import {
  BoardCreateCommand,
  BoardUpdateCommand,
} from '@app/community/board/board.command';
import { BoardProfileResponse } from '@app/community/board/dtos/board-profile.response';
import {
  BoardNotFoundException,
  BoardSlugDuplicatedException,
} from '@domain/community/community.errors';
import { Board } from '@domain/community/entities/board.entity';
import { Pagination } from '@infrastructure/types/pagination.types';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  /**
   * 게시판 목록을 검색합니다.
   */
  async searchBoards(
    page: number,
    limit: number,
  ): Promise<Pagination<BoardProfileResponse>> {
    const { items, meta } = await paginate(this.boardRepository, {
      page,
      limit,
    });

    return {
      items: items.map((board) => new BoardProfileResponse(board)),
      meta,
    };
  }

  /**
   * 게시판을 ID로 조회합니다.
   */
  async getBoardById(
    id: string,
    select?: FindOptionsSelect<Board>,
  ): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
      select,
    });
    if (!board) throw new BoardNotFoundException();
    return board;
  }

  /**
   * 게시판을 짧은 주소로 조회합니다.
   */
  async getBoardBySlug(
    slug: string,
    select?: FindOptionsSelect<Board>,
  ): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { slug },
      select,
    });
    if (!board) throw new BoardNotFoundException();
    return board;
  }

  /**
   * 새 게시판을 생성합니다.
   */
  async createBoard(data: BoardCreateCommand): Promise<Board> {
    if (data.slug) {
      await this.validateSlug(data.slug);
    }
    return this.boardRepository.save(data);
  }

  /**
   * 게시판 정보를 수정합니다.
   */
  async updateBoard(id: string, data: BoardUpdateCommand): Promise<Board> {
    const board = await this.getBoardById(id);

    if (data.slug) {
      await this.validateSlug(data.slug);
    }

    return this.boardRepository.save({
      ...board,
      ...data,
    });
  }

  /**
   * 게시판을 삭제합니다.
   */
  async deleteBoard(id: string): Promise<boolean> {
    const board = await this.getBoardById(id);

    const { affected } = await this.boardRepository.softDelete({
      id: board.id,
    });

    return affected > 0;
  }

  /**
   * 유효한 짧은 주소인지 확인합니다.
   */
  protected async validateSlug(slug: string): Promise<void> {
    const count = await this.boardRepository.count({ where: { slug } });
    if (count > 0) throw new BoardSlugDuplicatedException();
  }
}
