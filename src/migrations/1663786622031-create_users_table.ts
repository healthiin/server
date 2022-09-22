import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1663786622031 implements MigrationInterface {
  name = 'createUsersTable1663786622031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
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
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname")
        `);
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
            ADD "password" character varying NOT NULL
        `);
  }
}
