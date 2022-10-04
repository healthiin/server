import { MigrationInterface, QueryRunner } from 'typeorm';

export class releaseV4Beta1664868968433 implements MigrationInterface {
  name = 'releaseV4Beta1664868968433';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP CONSTRAINT "FK_fe6d6692e2ea20fa5bd2b57cf1b"
        `);
    await queryRunner.query(`
            CREATE TABLE "routine_manuals" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "target_number" integer,
                "set_number" integer,
                "weight" integer,
                "speed" integer,
                "play_minute" integer,
                "order" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "manual_id" uuid,
                CONSTRAINT "PK_91fc28756470bd526df1099ad68" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "routine_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "precaution" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "image_url" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "video_url" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ALTER COLUMN "type"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_manuals"
            ADD CONSTRAINT "FK_23220f97fddcd0e4f076dd973b6" FOREIGN KEY ("manual_id") REFERENCES "manuals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "routine_manuals" DROP CONSTRAINT "FK_23220f97fddcd0e4f076dd973b6"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ALTER COLUMN "type" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "video_url"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "image_url"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "precaution"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "routine_id" uuid
        `);
    await queryRunner.query(`
            DROP TABLE "routine_manuals"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD CONSTRAINT "FK_fe6d6692e2ea20fa5bd2b57cf1b" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
