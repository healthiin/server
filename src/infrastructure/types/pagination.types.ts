import { ApiProperty } from '@nestjs/swagger';
import { IPaginationMeta } from 'nestjs-typeorm-paginate';

export class PaginationMeta implements IPaginationMeta {
  @ApiProperty() currentPage!: number;
  @ApiProperty() itemCount!: number;
  @ApiProperty() itemsPerPage!: number;
  @ApiProperty() totalItems!: number;
  @ApiProperty() totalPages!: number;
}

export class Pagination<T> {
  @ApiProperty()
  items!: T[];

  @ApiProperty({ type: PaginationMeta })
  meta!: IPaginationMeta;
}
