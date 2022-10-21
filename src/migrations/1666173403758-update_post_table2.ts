import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePostTable21666173403758 implements MigrationInterface {
  name = 'updatePostTable21666173403758';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "views" integer NOT NULL DEFAULT '0'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "views"
        `);
  }
}
