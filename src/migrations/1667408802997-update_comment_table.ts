import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCommentTable1667408802997 implements MigrationInterface {
  name = 'updateCommentTable1667408802997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_06f316e1f2279bf691ed5f1fd52"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
                RENAME COLUMN "reply_to_id" TO "parent_comment_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_93ce08bdbea73c0c7ee673ec35a" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_93ce08bdbea73c0c7ee673ec35a"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
                RENAME COLUMN "parent_comment_id" TO "reply_to_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_06f316e1f2279bf691ed5f1fd52" FOREIGN KEY ("reply_to_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
