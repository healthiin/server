import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePostTable21666173403758 implements MigrationInterface {
  name = 'updatePostTable21666173403758';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "views" integer NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "meals" DROP COLUMN "photo_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "meals"
            ADD "photo_id" uuid NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "meals" DROP COLUMN "photo_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "meals"
            ADD "photo_id" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "views"
        `);
  }
}
