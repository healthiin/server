import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { CreateBoardData } from '@app/community/board/commands/create-board.data';
import { EditBoardData } from '@app/community/board/commands/edit-board.data';
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

  async searchBoard(
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

  async getBoardProfile(id: string): Promise<BoardProfileResponse> {
    const board = await this.findById(id);
    return new BoardProfileResponse(board);
  }

  async editBoardProfile(
    id: string,
    data: EditBoardData,
  ): Promise<BoardProfileResponse> {
    const board = await this.findById(id);

    if (data.slug) {
      await this.validateSlug(data.slug);
    }

    const updatedBoard = await this.boardRepository.save({
      ...board,
      ...data,
    });

    return new BoardProfileResponse(updatedBoard);
  }

  async createBoard(data: CreateBoardData): Promise<BoardProfileResponse> {
    if (data.slug) {
      await this.validateSlug(data.slug);
    }
    const board = await this.boardRepository.save(data);
    return new BoardProfileResponse(board);
  }

  async deleteBoard(id: string): Promise<boolean> {
    const board = await this.findById(id);

    const { affected } = await this.boardRepository.softDelete({
      id: board.id,
    });

    return affected > 0;
  }

  async findBySlug(
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

  async findById(
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

  protected async validateSlug(slug: string): Promise<void> {
    const count = await this.boardRepository.count({ where: { slug } });
    if (count > 0) throw new BoardSlugDuplicatedException();
  }
}
