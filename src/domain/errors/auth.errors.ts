import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export const AUTH_ERRORS = {
  TOKEN_INVALID: 'TOKEN_INVALID',
  UNAUTHORIZED: 'UNAUTHORIZED',
  KAKAO_OAUTH_FAILED: 'KAKAO_OAUTH_FAILED',
  INVALID_VENDOR_NAME: 'INVALID_VENDOR_NAME',
};

export class InvalidTokenException extends BadRequestException {
  constructor() {
    super('인증 정보가 올바르지 않습니다.', AUTH_ERRORS.TOKEN_INVALID);
  }
}

export class NeedAuthenticationException extends UnauthorizedException {
  constructor() {
    super('로그인이 필요합니다.', AUTH_ERRORS.UNAUTHORIZED);
  }
}

export class KakaoOAuthFailedException extends UnauthorizedException {
  constructor() {
    super('카카오 로그인에 실패했습니다.', AUTH_ERRORS.KAKAO_OAUTH_FAILED);
  }
}

export class InvalidVendorNameException extends BadRequestException {
  constructor() {
    super(
      '유효하지 않은 OAUTH 제공자 이름입니다.',
      AUTH_ERRORS.INVALID_VENDOR_NAME,
    );
  }
}
