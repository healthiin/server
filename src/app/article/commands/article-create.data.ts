export type ArticleCreateData = {
  username: string;
  title: string;
  contents: string;
  thumbnail: string | null;
  category: 'general' | 'question' | 'record' | 'information';
};
