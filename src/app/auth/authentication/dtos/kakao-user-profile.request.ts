import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class KakaoUserProfileRequest {
  @ApiProperty({
    example: '1234567890',
    description: '카카오 사용자 고유번호',
  })
  @IsNotEmpty()
  @IsString()
  id!: string;

  @ApiProperty({
    example: '2022-01-01T20:30:24Z',
    description: '카카오 사용자 연결 시간',
  })
  @IsNotEmpty()
  @IsString()
  connected_at: string;

  @IsNotEmpty()
  @IsArray()
  kakao_account: {
    has_email: boolean;
    email_needs_agreement: boolean;
    email?: string;

    has_age_range: boolean;
    age_range_needs_agreement: boolean;
    age_range?: string;

    has_gender: boolean;
    gender_needs_agreement: boolean;
    gender?: string;
  };
}
