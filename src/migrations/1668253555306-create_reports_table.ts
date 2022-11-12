import { MigrationInterface, QueryRunner } from 'typeorm';

export class createReportsTable1668253555306 implements MigrationInterface {
  name = 'createReportsTable1668253555306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "reports" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "year" integer NOT NULL,
                "week" integer NOT NULL,
                "visibility" character varying NOT NULL DEFAULT 'PUBLIC',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "reports"
            ADD CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "reports" DROP CONSTRAINT "FK_ca7a21eb95ca4625bd5eaef7e0c"
        `);
    await queryRunner.query(`
            DROP TABLE "reports"
        `);
  }
}
