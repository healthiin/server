export class PostService {
  // constructor() {}

  async getPosts(): Promise<object[]> {
    return [
      {
        id: '1',
        title: '제목1',
        content: '내용1',
        boardId: { id: '1' },
        createdAt: new Date(),
      },
      {
        id: '2',
        title: '제목2',
        content: '내용2',
        boardId: { id: '1' },
        createdAt: new Date(),
      },
    ];
  }

  async getPostsByBoardId(boardId: string): Promise<object[]> {
    return [
      {
        id: '1',
        title: '제목1',
        content: '내용1',
        boardId: { id: '1' },
        createdAt: new Date(),
      },
      {
        id: '2',
        title: '제목2',
        content: '내용2',
        boardId: { id: '1' },
        createdAt: new Date(),
      },
    ];
  }

  async getPostById(postId: string): Promise<object> {
    return {
      id: '1',
      title: '제목1',
      content: '내용1',
      boardId: { id: '1' },
      createdAt: new Date(),
    };
  }

  async createPost(): Promise<object> {
    return {
      id: '1',
      title: '제목1',
      content: '내용1',
      boardId: { id: '1' },
      createdAt: new Date(),
    };
  }

  async updatePost(postId: string): Promise<object> {
    return {
      id: '1',
      title: '제목1-수정',
      content: '내용1-수정',
      boardId: { id: '1' },
      createdAt: new Date(),
    };
  }

  async deletePost(postId: string): Promise<boolean> {
    return true;
  }
}
