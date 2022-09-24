import { ApiProperty } from '@nestjs/swagger';

type TokenResponseData = { accessToken: string; isFreshman?: boolean };

export class TokenResponse {
  @ApiProperty() private accessToken!: string;
  @ApiProperty({ nullable: true }) private isFreshman?: boolean;

  constructor(data: TokenResponseData) {
    this.accessToken = data.accessToken;
    this.isFreshman = data.isFreshman;
  }
}
