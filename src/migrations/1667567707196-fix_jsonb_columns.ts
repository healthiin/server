import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixJsonbColumns1667567707196 implements MigrationInterface {
  name = 'fixJsonbColumns1667567707196';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "meals" DROP COLUMN "nutrients"
        `);
    await queryRunner.query(`
            ALTER TABLE "meals"
            ADD "nutrients" character varying NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "meals" DROP COLUMN "nutrients"
        `);
    await queryRunner.query(`
            ALTER TABLE "meals"
            ADD "nutrients" jsonb NOT NULL
        `);
  }
}
