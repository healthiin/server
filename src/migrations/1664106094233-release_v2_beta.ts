import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1664106094233 implements MigrationInterface {
  name = 'createUsersTable1664106094233';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "phone_number"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "age_range" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "gender" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "user_email" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "nickname" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "nickname"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "user_email"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "gender"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "age_range"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "phone_number" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying NOT NULL
        `);
  }
}
