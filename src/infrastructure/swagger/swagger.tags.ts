export const tags: SwaggerTag[] = [
  // 인증 관련 태그
  { name: 'Authentication', description: '사용자 인증' },
  { name: 'User', description: '사용자 계정' },
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
