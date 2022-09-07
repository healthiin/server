import { BoardProperties } from '@domain/community/board';

export type BoardCreateCommand = Pick<BoardProperties, 'title'> &
  Partial<Pick<BoardProperties, 'description' | 'slug'>>;

export type BoardUpdateCommand = Partial<BoardCreateCommand>;
