export const tags: SwaggerTag[] = [
  { name: 'Authentication', description: '사용자 인증' },
  { name: 'User', description: '사용자 계정' },
  { name: 'Board', description: '게시판' },
  { name: 'Gym', description: '헬스장' },
  { name: 'Gym User', description: '헬스장 구성원' },
  { name: 'Gym Notice', description: '헬스장 공지사항' },
];

type SwaggerTag = { name: string; description: string };
