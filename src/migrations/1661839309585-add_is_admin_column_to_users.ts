import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIsAdminColumnToUsers1661839309585
  implements MigrationInterface
{
  name = 'addIsAdminColumnToUsers1661839309585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP CONSTRAINT "FK_d9b5d8ce004e262cc970ab6be9b"
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
            CREATE TABLE "managers" (
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
                "managing_gyms_id" uuid,
                CONSTRAINT "UQ_fccadd24fa0b0f7e1793ba007aa" UNIQUE ("username"),
                CONSTRAINT "UQ_57d3623b623c9343d7af00024aa" UNIQUE ("nickname"),
                CONSTRAINT "PK_e70b8cc457276d9b4d82342a8ff" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "notices" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "contents" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "writer_id" uuid,
                "gym_id" uuid,
                CONSTRAINT "PK_3eb18c29da25d6935fcbe584237" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "equipment_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "description"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "location"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "contact"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "updated_at"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "post_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "author_id"
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
            ALTER TABLE "gyms"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "description" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "location" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "contact" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "is_admin" boolean NOT NULL DEFAULT false
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "post_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "author_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "gym_name" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "address" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD CONSTRAINT "UQ_cfae51823630f481916c4aa4f16" UNIQUE ("address")
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "franchise" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "gym_info" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "manager_id" uuid
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
            ALTER TABLE "comments"
            ADD "parent_comment_id_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ALTER COLUMN "description"
            SET NOT NULL
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
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_22fd59b98091387a27788f7a8b1" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "posts"
            ADD CONSTRAINT "FK_312c63be865c81b922e39c2475e" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "managers"
            ADD CONSTRAINT "FK_7be8248842f40cb0c9333983e38" FOREIGN KEY ("managing_gyms_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD CONSTRAINT "FK_8da9a792a92d2e8552c4ae04577" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "notices"
            ADD CONSTRAINT "FK_91eb3b773dcdb88f5b1f8487e39" FOREIGN KEY ("writer_id") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "notices"
            ADD CONSTRAINT "FK_bb76c87704f2304e3e97b19a124" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD CONSTRAINT "FK_d9b5d8ce004e262cc970ab6be9b" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_5d2a94a20d6b49267510ab53f28" FOREIGN KEY ("parent_comment_id_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_5d2a94a20d6b49267510ab53f28"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP CONSTRAINT "FK_d9b5d8ce004e262cc970ab6be9b"
        `);
    await queryRunner.query(`
            ALTER TABLE "notices" DROP CONSTRAINT "FK_bb76c87704f2304e3e97b19a124"
        `);
    await queryRunner.query(`
            ALTER TABLE "notices" DROP CONSTRAINT "FK_91eb3b773dcdb88f5b1f8487e39"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP CONSTRAINT "FK_8da9a792a92d2e8552c4ae04577"
        `);
    await queryRunner.query(`
            ALTER TABLE "managers" DROP CONSTRAINT "FK_7be8248842f40cb0c9333983e38"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_312c63be865c81b922e39c2475e"
        `);
    await queryRunner.query(`
            ALTER TABLE "posts" DROP CONSTRAINT "FK_22fd59b98091387a27788f7a8b1"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments" DROP CONSTRAINT "FK_f27d51da7660070662c3810bf2f"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_equipments" DROP CONSTRAINT "FK_e62ff1b572a8e4794dcc254e434"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ALTER COLUMN "description" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "parent_comment_id_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "equipment_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "manager_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "gym_info"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "franchise"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP CONSTRAINT "UQ_cfae51823630f481916c4aa4f16"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "address"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "gym_name"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "author_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "post_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "updated_at"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "is_admin"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "contact"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "location"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "description"
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms" DROP COLUMN "name"
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
            ALTER TABLE "comments"
            ADD "author_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "post_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "contact" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "location" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "description" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "gyms"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "equipment_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD "name" character varying NOT NULL
        `);
    await queryRunner.query(`
            DROP TABLE "notices"
        `);
    await queryRunner.query(`
            DROP TABLE "managers"
        `);
    await queryRunner.query(`
            DROP TABLE "comments"
        `);
    await queryRunner.query(`
            DROP TABLE "posts"
        `);
    await queryRunner.query(`
            DROP TABLE "gym_equipments"
        `);
    await queryRunner.query(`
            ALTER TABLE "manuals"
            ADD CONSTRAINT "FK_d9b5d8ce004e262cc970ab6be9b" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
