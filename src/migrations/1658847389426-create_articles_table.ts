import { MigrationInterface, QueryRunner } from 'typeorm';

export class createArticlesTable1658847389426 implements MigrationInterface {
  name = 'createArticlesTable1658847389426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "articles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "category" character varying NOT NULL,
                "username" character varying NOT NULL,
                "title" character varying NOT NULL,
                "contents" character varying NOT NULL,
                "thumbnail" character varying,
                "like_count" integer NOT NULL,
                "comment_count" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "articles"
        `);
  }
}
