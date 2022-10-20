import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateCommentTable1665956280436 implements MigrationInterface {
  name = 'updateCommentTable1665956280436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "reply_to_id" uuid
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
            ALTER TABLE "comments" DROP COLUMN "reply_to_id"
        `);
  }
}
