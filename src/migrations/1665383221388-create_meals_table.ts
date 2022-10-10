import { MigrationInterface, QueryRunner } from 'typeorm';

export class createMealsTable1665383221388 implements MigrationInterface {
  name = 'createMealsTable1665383221388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "meals" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" character varying NOT NULL,
                "date" date NOT NULL,
                "title" character varying NOT NULL,
                "photo_id" character varying NOT NULL,
                "nutrients" jsonb NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                CONSTRAINT "PK_e6f830ac9b463433b58ad6f1a59" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "meals"
            ADD CONSTRAINT "FK_d89009b328c39e42964f8b3f95b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "meals" DROP CONSTRAINT "FK_d89009b328c39e42964f8b3f95b"
        `);
    await queryRunner.query(`
            DROP TABLE "meals"
        `);
  }
}
