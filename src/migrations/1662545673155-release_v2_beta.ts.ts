import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1664012106224 implements MigrationInterface {
  name = 'createUsersTable1664012106224';

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
                "description" character varying,
                "type" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "equipment_id" uuid,
                "routine_id" uuid,
                CONSTRAINT "PK_ff041e52910af133b601ce3c707" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "equipments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "en_name" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "gym_equipment_gym" uuid,
                "gym_equipment_equipments" uuid,
                CONSTRAINT "PK_250348d5d9ae4946bcd634f3e61" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "gym_equipments" (
                "gym" uuid NOT NULL,
                "equipments" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "gym_id" uuid,
                "equipments_id" uuid,
                CONSTRAINT "PK_fd9a3948152eba52cf550108d0f" PRIMARY KEY ("gym", "equipments")
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
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "nickname" character varying,
                "age_range" character varying,
                "gender" character varying,
                "user_email" character varying,
                "avatar_image" character varying,
                "is_admin" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "content" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "post_id" uuid,
                "author_id" uuid,
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "posts" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "content" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "board_id" uuid,
                "author_id" uuid,
                CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")
            )
        `);
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
            ALTER TABLE "routines"
            ADD CONSTRAINT "FK_8b95ddac537fa1fc1eddf7d4487" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD CONSTRAINT "FK_d9b5d8ce004e262cc970ab6be9b" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD CONSTRAINT "FK_fe6d6692e2ea20fa5bd2b57cf1b" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "equipments"
            ADD CONSTRAINT "FK_162e2a72d36c5d133f7d430a43b" FOREIGN KEY ("gym_equipment_gym", "gym_equipment_equipments") REFERENCES "gym_equipments"("gym", "equipments") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments"
            ADD CONSTRAINT "FK_e62ff1b572a8e4794dcc254e434" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments"
            ADD CONSTRAINT "FK_a927413fb935acbdc02da7c3c5a" FOREIGN KEY ("equipments_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "gym_notices"
            ADD CONSTRAINT "FK_15d0e8e3b02cb2d340c2b15730f" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices"
            ADD CONSTRAINT "FK_60fd9bbcdd20224aba703ffbaf4" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_22fd59b98091387a27788f7a8b1" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_22fd59b98091387a27788f7a8b1"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices" DROP CONSTRAINT "FK_60fd9bbcdd20224aba703ffbaf4"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_notices" DROP CONSTRAINT "FK_15d0e8e3b02cb2d340c2b15730f"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_users" DROP CONSTRAINT "FK_f02a538a1946df483eb05d693e2"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_users" DROP CONSTRAINT "FK_1858ce57d02ba1da15fcfb48fc3"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments" DROP CONSTRAINT "FK_a927413fb935acbdc02da7c3c5a"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments" DROP CONSTRAINT "FK_e62ff1b572a8e4794dcc254e434"
        `);
    await queryRunner.query(`
            ALTER TABLE "equipments" DROP CONSTRAINT "FK_162e2a72d36c5d133f7d430a43b"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP CONSTRAINT "FK_fe6d6692e2ea20fa5bd2b57cf1b"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP CONSTRAINT "FK_d9b5d8ce004e262cc970ab6be9b"
        `);
    await queryRunner.query(`
            ALTER TABLE "routines" DROP CONSTRAINT "FK_8b95ddac537fa1fc1eddf7d4487"
        `);
    await queryRunner.query(`
            DROP TABLE "boards"
        `);
    await queryRunner.query(`
            DROP TABLE "posts"
        `);
    await queryRunner.query(`
            DROP TABLE "comments"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            DROP TABLE "gym_notices"
        `);
    await queryRunner.query(`
            DROP TABLE "gyms"
        `);
    await queryRunner.query(`
            DROP TABLE "gym_users"
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
