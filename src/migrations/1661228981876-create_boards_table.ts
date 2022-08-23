import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBoardsTable1661228981876 implements MigrationInterface {
  name = 'createBoardsTable1661228981876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "boards" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" character varying,
                "slug" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "UQ_9a01141982175d5633687bcb47d" UNIQUE ("slug"),
                CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "name" character varying NOT NULL,
                "nickname" character varying NOT NULL,
                "avatar_image" character varying,
                "phone_number" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
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
            CREATE TABLE "gyms" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying,
                "location" character varying,
                "contact" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_fe765086496cf3c8475652cddcb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "gym_users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "role" character varying NOT NULL DEFAULT 'CUSTOMER',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "gym_id" uuid,
                "user_id" uuid,
                CONSTRAINT "PK_b39512ec408c47f6ae6711fbdf1" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "manuals" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "equipment_id" uuid,
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
            ALTER TABLE "gym_notices"
            ADD CONSTRAINT "FK_15d0e8e3b02cb2d340c2b15730f" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices"
            ADD CONSTRAINT "FK_60fd9bbcdd20224aba703ffbaf4" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_users"
            ADD CONSTRAINT "FK_1858ce57d02ba1da15fcfb48fc3" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_users"
            ADD CONSTRAINT "FK_f02a538a1946df483eb05d693e2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "gym_users" DROP CONSTRAINT "FK_f02a538a1946df483eb05d693e2"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_users" DROP CONSTRAINT "FK_1858ce57d02ba1da15fcfb48fc3"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices" DROP CONSTRAINT "FK_60fd9bbcdd20224aba703ffbaf4"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices" DROP CONSTRAINT "FK_15d0e8e3b02cb2d340c2b15730f"
        `);
    await queryRunner.query(`
            DROP TABLE "equipments"
        `);
    await queryRunner.query(`
            DROP TABLE "manuals"
        `);
    await queryRunner.query(`
            DROP TABLE "gym_users"
        `);
    await queryRunner.query(`
            DROP TABLE "gyms"
        `);
    await queryRunner.query(`
            DROP TABLE "gym_notices"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "boards"
        `);
  }
}
