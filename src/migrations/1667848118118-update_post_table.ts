import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatePostTable1667848118118 implements MigrationInterface {
  name = 'updatePostTable1667848118118';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD "images" text array NOT NULL DEFAULT '{}'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts" DROP COLUMN "images"
        `);
  }
}
