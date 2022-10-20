import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRoutineLogsTable1666013386983 implements MigrationInterface {
  name = 'createRoutineLogsTable1666013386983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "routine_logs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "target_number" integer,
                "set_number" integer,
                "weight" integer,
                "speed" integer,
                "play_minute" integer,
                "started_at" TIMESTAMP NOT NULL,
                "ended_at" TIMESTAMP NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                "routine_id" uuid,
                "manual_id" uuid,
                CONSTRAINT "PK_b6e0dcc996d38db99387162b164" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_logs"
            ADD CONSTRAINT "FK_7777279754284cb09a4905e8da7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_logs"
            ADD CONSTRAINT "FK_eaf7b789384ef9ee38c6a4cce79" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_logs"
            ADD CONSTRAINT "FK_d321c985d3534862bfc8489c347" FOREIGN KEY ("manual_id") REFERENCES "routine_manuals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "routine_logs" DROP CONSTRAINT "FK_d321c985d3534862bfc8489c347"
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_logs" DROP CONSTRAINT "FK_eaf7b789384ef9ee38c6a4cce79"
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_logs" DROP CONSTRAINT "FK_7777279754284cb09a4905e8da7"
        `);
    await queryRunner.query(`
            DROP TABLE "routine_logs"
        `);
  }
}
