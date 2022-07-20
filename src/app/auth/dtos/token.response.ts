import { ApiProperty } from '@nestjs/swagger';

type TokenResponseData = { accessToken: string };

export class TokenResponse {
  @ApiProperty() private accessToken!: string;

  constructor(data: TokenResponseData) {
    this.accessToken = data.accessToken;
  }
}
