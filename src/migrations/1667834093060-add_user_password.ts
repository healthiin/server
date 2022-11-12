import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserPassword1667834093060 implements MigrationInterface {
  name = 'addUserPassword1667834093060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
  }
}
