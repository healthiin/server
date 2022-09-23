import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export const AUTH_ERRORS = {
  TOKEN_INVALID: 'TOKEN_INVALID',
  UNAUTHORIZED: 'UNAUTHORIZED',
  KAKAO_OAUTH_FAILED: 'KAKAO_OAUTH_FAILED',
  GOOGLE_OAUTH_FAILED: 'GOOGLE_OAUTH_FAILED',
  UNSUPPORTED_VENDOR_TYPE: 'UNSUPPORTED_VENDOR_TYPE',
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

export class GoogleOAuthFailedException extends UnauthorizedException {
  constructor() {
    super('구글 로그인에 실패했습니다.', AUTH_ERRORS.GOOGLE_OAUTH_FAILED);
  }
}

export class UnSupportedVendorTypeException extends BadRequestException {
  constructor() {
    super(
      '지원하지 않는 OAuth 제공자 타입입니다.',
      AUTH_ERRORS.UNSUPPORTED_VENDOR_TYPE,
    );
  }
}
