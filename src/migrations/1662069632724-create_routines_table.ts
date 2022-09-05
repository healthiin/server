import { MigrationInterface, QueryRunner } from 'typeorm';

export class createRoutinesTable1662069632724 implements MigrationInterface {
  name = 'createRoutinesTable1662069632724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "routines" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "author_id" uuid,
                CONSTRAINT "PK_6847e8f0f74e65a6f10409dee9f" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "manuals" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "en_title" character varying NOT NULL,
                "type" character varying NOT NULL,
                "difficulty" integer NOT NULL,
                "description" character varying NOT NULL,
                "precautions" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "routine_id" uuid,
                CONSTRAINT "PK_ff041e52910af133b601ce3c707" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "equipments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "gym_equipments" (
                "gym" uuid NOT NULL,
                "equipment" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "gym_id" uuid,
                "equipment_id" uuid,
                CONSTRAINT "PK_1a5285e75c6d48ec580413e1589" PRIMARY KEY ("gym", "equipment")
            )
        `);
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
            ALTER TABLE "manuals" DROP COLUMN "title"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "en_title"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "type"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "difficulty"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "precautions"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "routine_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "title" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "en_title" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "type" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "difficulty" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "precautions" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "routine_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "equipment_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ALTER COLUMN "description" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "routines"
            ADD CONSTRAINT "FK_8b95ddac537fa1fc1eddf7d4487" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD CONSTRAINT "FK_fe6d6692e2ea20fa5bd2b57cf1b" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments"
            ADD CONSTRAINT "FK_e62ff1b572a8e4794dcc254e434" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments"
            ADD CONSTRAINT "FK_f27d51da7660070662c3810bf2f" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices"
            ADD CONSTRAINT "FK_15d0e8e3b02cb2d340c2b15730f" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices"
            ADD CONSTRAINT "FK_60fd9bbcdd20224aba703ffbaf4" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD CONSTRAINT "FK_d9b5d8ce004e262cc970ab6be9b" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP CONSTRAINT "FK_d9b5d8ce004e262cc970ab6be9b"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices" DROP CONSTRAINT "FK_60fd9bbcdd20224aba703ffbaf4"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices" DROP CONSTRAINT "FK_15d0e8e3b02cb2d340c2b15730f"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments" DROP CONSTRAINT "FK_f27d51da7660070662c3810bf2f"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments" DROP CONSTRAINT "FK_e62ff1b572a8e4794dcc254e434"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP CONSTRAINT "FK_fe6d6692e2ea20fa5bd2b57cf1b"
        `);
    await queryRunner.query(`
            ALTER TABLE "routines" DROP CONSTRAINT "FK_8b95ddac537fa1fc1eddf7d4487"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ALTER COLUMN "description"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "equipment_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "routine_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "precautions"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "difficulty"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "type"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "en_title"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "title"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "routine_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "precautions" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "difficulty" integer NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "type" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "en_title" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "title" character varying NOT NULL
        `);
    await queryRunner.query(`
            DROP TABLE "gym_notices"
        `);
    await queryRunner.query(`
            DROP TABLE "gym_equipments"
        `);
    await queryRunner.query(`
            DROP TABLE "equipments"
        `);
    await queryRunner.query(`
            DROP TABLE "manuals"
        `);
    await queryRunner.query(`
            DROP TABLE "routines"
        `);
  }
}
