import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixRoutine1665100481099 implements MigrationInterface {
  name = 'fixRoutine1665100481099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "routine_manuals"
            ADD "routine_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_manuals"
            ADD CONSTRAINT "FK_26836f65d42ac7ae8e97c382507" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "routine_manuals" DROP CONSTRAINT "FK_26836f65d42ac7ae8e97c382507"
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_manuals" DROP COLUMN "routine_id"
        `);
  }
}
