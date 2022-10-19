import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePostTable1665996819376 implements MigrationInterface {
  name = 'updatePostTable1665996819376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_06f316e1f2279bf691ed5f1fd52"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "reply_to_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "reply_to_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "likes_count" integer NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "comments_count" integer NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_06f316e1f2279bf691ed5f1fd52" FOREIGN KEY ("reply_to_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_06f316e1f2279bf691ed5f1fd52"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "comments_count"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "likes_count"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "reply_to_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "reply_to_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_06f316e1f2279bf691ed5f1fd52" FOREIGN KEY ("reply_to_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
