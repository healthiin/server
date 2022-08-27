import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { BoardModule } from '@app/community/board/board.module';
import { PostModule } from '@app/community/post/post.module';
import { Board } from '@domain/community/entities/board.entity';
import { Post } from '@domain/community/entities/post.entity';

describe('Posts', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PostModule,
        BoardModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'healthin',
          password: 'secret',
          database: 'healthin_server',
          entities: [Post, Board],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('Post Story', () => {
    const postCreatePayload = {
      title: '제목',
      content: '내용',
    };
    const postUpdatePayload = {
      title: '제목-수정',
      content: '내용-수정',
    };

    const boardCreatePayload = {
      title: 'boardTitle',
      description: '내용',
    };

    it('should get all posts', async () => {
      await request(app.getHttpServer()).get('/posts').expect(200);
    });

    it('should get posts by boardId', async () => {
      const board = await request(app.getHttpServer())
        .post('/boards')
        .send(boardCreatePayload)
        .expect(201);

      await request(app.getHttpServer())
        .get(`/posts/board/${board.body.id}`)
        .expect(200);
    });

    it('should get post by postId', async () => {
      const board = await request(app.getHttpServer())
        .post('/boards')
        .send(boardCreatePayload)
        .expect(201);

      const post = await request(app.getHttpServer())
        .post(`/posts/board/${board.body.id}`)
        .send(postCreatePayload)
        .expect(201);

      await request(app.getHttpServer())
        .get(`/posts/${post.body.id}`)
        .expect(200);
    });

    it('should create post', async () => {
      const board = await request(app.getHttpServer())
        .post('/boards')
        .send(boardCreatePayload)
        .expect(201);

      await request(app.getHttpServer())
        .post(`/posts/board/${board.body.id}`)
        .send(postCreatePayload)
        .expect(201);
    });

    it('should update post', async () => {
      const board = await request(app.getHttpServer())
        .post('/boards')
        .send(boardCreatePayload)
        .expect(201);

      const post = await request(app.getHttpServer())
        .post(`/posts/board/${board.body.id}`)
        .send(postCreatePayload)
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/posts/${post.body.id}`)
        .send(postUpdatePayload)
        .expect(200);
    });

    it('should delete post', async () => {
      const board = await request(app.getHttpServer())
        .post('/boards')
        .send(boardCreatePayload)
        .expect(201);

      const post = await request(app.getHttpServer())
        .post(`/posts/board/${board.body.id}`)
        .send(postCreatePayload)
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/posts/${post.body.id}`)
        .expect(200);
    });
  });
});
