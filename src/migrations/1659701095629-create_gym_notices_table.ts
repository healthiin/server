import { MigrationInterface, QueryRunner } from 'typeorm';

export class createGymNoticesTable1659701095629 implements MigrationInterface {
  name = 'createGymNoticesTable1659701095629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "gym_notices" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "body" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "author_id" uuid,
                "gym_id" uuid,
                CONSTRAINT "PK_0d1fba3f41e541759a7233e0512" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices"
            ADD CONSTRAINT "FK_15d0e8e3b02cb2d340c2b15730f" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices"
            ADD CONSTRAINT "FK_60fd9bbcdd20224aba703ffbaf4" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "gym_notices" DROP CONSTRAINT "FK_60fd9bbcdd20224aba703ffbaf4"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices" DROP CONSTRAINT "FK_15d0e8e3b02cb2d340c2b15730f"
        `);
    await queryRunner.query(`
            DROP TABLE "gym_notices"
        `);
  }
}
