import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';

import { BoardNotFoundException } from '@domain/community/community.errors';
import { Board } from '@domain/community/entities/board.entity';

export class CommentService {
  // constructor() {}

  async getComments(id: string): Promise<object> {
    return {
      comments: [
        {
          id: '1',
          content: '댓글1',
          User: {
            id: '1',
            nickname: '유저1',
          },
          createdAt: '2020-01-01',
          parentComment: {
            id: null,
          },
        },
        {
          id: '2',
          content: '댓글2',
          User: {
            id: '2',
            nickname: '유저2',
          },
          createdAt: '2020-01-01',
          parentComment: {
            id: '1',
          },
        },
      ],
    };
  }

  async createComment(): Promise<object> {
    return {
      id: '1',
      content: '댓글1',
      User: {
        id: '1',
        nickname: '유저1',
      },
      createdAt: '2020-01-01',
      parentComment: {
        id: null,
      },
    };
  }

  async createReComment(): Promise<object> {
    return {
      id: '2',
      content: '댓글1',
      User: {
        id: '2',
        nickname: '유저2',
      },
      createdAt: '2020-01-01',
      parentComment: {
        id: '1',
      },
    };
  }

  async updateComment(): Promise<object> {
    return {
      id: '1',
      content: '업데이트된 댓글1',
      User: {
        id: '1',
        nickname: '유저1',
      },
      createdAt: '2020-01-01',
      parentComment: {
        id: null,
      },
    };
  }

  async deleteComment(): Promise<boolean> {
    return true;
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
}
