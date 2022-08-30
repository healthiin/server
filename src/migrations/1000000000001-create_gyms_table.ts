import { MigrationInterface, QueryRunner } from 'typeorm';

export class createGymsTable1000000000001 implements MigrationInterface {
  name = 'createGymsTable1000000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
            ALTER TABLE "gym_users"
            ADD CONSTRAINT "FK_1858ce57d02ba1da15fcfb48fc3" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_users"
            ADD CONSTRAINT "FK_f02a538a1946df483eb05d693e2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "gym_users" DROP CONSTRAINT "FK_f02a538a1946df483eb05d693e2"
        `);
    await queryRunner.query(`
            ALTER TABLE "gym_users" DROP CONSTRAINT "FK_1858ce57d02ba1da15fcfb48fc3"
        `);
    await queryRunner.query(`
            DROP TABLE "gyms"
        `);
    await queryRunner.query(`
            DROP TABLE "gym_users"
        `);
  }
}
