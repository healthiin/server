export const tags: SwaggerTag[] = [
  // 계정 관련 태그
  { name: '[계정] 인증', description: '계정 관련 기능' },
  { name: '[계정] 프로필', description: '계정 관련 기능' },
  // 커뮤니티 관련 태그
  { name: '[커뮤니티] 게시판', description: '커뮤니티 관련 기능' },
  { name: '[커뮤니티] 게시글', description: '커뮤니티 관련 기능' },
  { name: '[커뮤니티] 댓글', description: '커뮤니티 관련 기능' },
  // 헬스장 관련 태그
  { name: '[헬스장] 코어', description: '헬스장 관련 기능' },
  { name: '[헬스장] 구성원', description: '헬스장 관련 기능' },
  { name: '[헬스장] 공지사항', description: '헬스장 관련 기능' },
  // 메뉴얼 태그 태그
  { name: '[메뉴얼] 루틴', description: '루틴 관련 기능' },
  { name: '[메뉴얼] 메뉴얼', description: '메뉴얼 관련 기능' },
  { name: '[메뉴얼] 루틴 메뉴얼', description: '루틴 메뉴얼 관련 기능' },
  // 기록 태그
  { name: '[기록] 식단', description: '식단 기록 관련 기능' },
];

type SwaggerTag = { name: string; description: string };
