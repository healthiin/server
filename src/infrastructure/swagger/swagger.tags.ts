export const tags: SwaggerTag[] = [
  { name: 'Authentication', description: '사용자 인증' },
  { name: 'User', description: '사용자 계정' },
  { name: 'Board', description: '게시판' },
];

type SwaggerTag = { name: string; description: string };
