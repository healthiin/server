import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixRoutine21665504146076 implements MigrationInterface {
  name = 'fixRoutine21665504146076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "routine_types" (
                "routine" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" character varying NOT NULL,
                "routine_id" uuid,
                CONSTRAINT "PK_1899f567e0eb2fd6028678becc6" PRIMARY KEY ("routine")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "routines"
            ADD "day" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "routines"
            ADD "status" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "routines"
            ADD "owner_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_types"
            ADD CONSTRAINT "FK_65484dc637bdb52a21fa4415f79" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "routines"
            ADD CONSTRAINT "FK_7a630198133275a97fd6ac9f469" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "routines" DROP CONSTRAINT "FK_7a630198133275a97fd6ac9f469"
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_types" DROP CONSTRAINT "FK_65484dc637bdb52a21fa4415f79"
        `);
    await queryRunner.query(`
            ALTER TABLE "routines" DROP COLUMN "owner_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "routines" DROP COLUMN "status"
        `);
    await queryRunner.query(`
            ALTER TABLE "routines" DROP COLUMN "day"
        `);
    await queryRunner.query(`
            DROP TABLE "routine_types"
        `);
  }
}
