export const tags: SwaggerTag[] = [
  // 계정 관련 태그
  { name: '[계정] 인증', description: '계정 관련 기능' },
  { name: '[계정] 프로필', description: '계정 관련 기능' },
  // 커뮤니티 관련 태그
  { name: '[커뮤니티] 게시판', description: '커뮤니티 관련 기능' },
  { name: '[커뮤니티] 게시글', description: '커뮤니티 관련 기능' },
  { name: '[커뮤니티] 댓글', description: '커뮤니티 관련 기능' },
  // 헬스장 관련 태그
  { name: 'Gym', description: '헬스장' },
  { name: 'Gym User', description: '헬스장 구성원' },
  { name: 'Gym Notice', description: '헬스장 공지사항' },
];

type SwaggerTag = { name: string; description: string };
