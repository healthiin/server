import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateRoutineTables1666806563533 implements MigrationInterface {
  name = 'updateRoutineTable1666806563533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "routine_likes" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "routine_id" uuid,
                "user_id" uuid,
                CONSTRAINT "PK_5beeb395b366303f0a8ee523a51" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "routines"
            ADD "like_count" integer NOT NULL DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_likes"
            ADD CONSTRAINT "FK_c6ebbe5b61a99b0fbbbda9abc01" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_likes"
            ADD CONSTRAINT "FK_5093e7a1d12a921a1cac9faa27f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "routine_likes" DROP CONSTRAINT "FK_5093e7a1d12a921a1cac9faa27f"
        `);
    await queryRunner.query(`
            ALTER TABLE "routine_likes" DROP CONSTRAINT "FK_c6ebbe5b61a99b0fbbbda9abc01"
        `);
    await queryRunner.query(`
            ALTER TABLE "routines" DROP COLUMN "like_count"
        `);
    await queryRunner.query(`
            DROP TABLE "routine_likes"
        `);
  }
}
