import { MigrationInterface, QueryRunner } from 'typeorm';

export class releaseV3Beta1664376954041 implements MigrationInterface {
  name = 'releaseV3Beta1664376954041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD "qr_url" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "UQ_3809b6edb8b0af94db82417f692" UNIQUE ("qr_url")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "UQ_3809b6edb8b0af94db82417f692"
        `);
    await queryRunner.query(`
            ALTER TABLE "equipments" DROP COLUMN "qr_url"
        `);
  }
}
