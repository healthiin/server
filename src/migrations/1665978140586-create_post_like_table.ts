import { MigrationInterface, QueryRunner } from 'typeorm';

export class createPostLikeTable1665978140586 implements MigrationInterface {
  name = 'createPostLikeTable1665978140586';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "post_likes" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "post_id" uuid,
                "user_id" uuid,
                CONSTRAINT "PK_e4ac7cb9daf243939c6eabb2e0d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "post_images" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "url" character varying NOT NULL,
                "post_id" uuid,
                CONSTRAINT "PK_32fe67d8cdea0e7536320d7c454" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "post_likes"
            ADD CONSTRAINT "FK_b40d37469c501092203d285af80" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "post_likes"
            ADD CONSTRAINT "FK_9b9a7fc5eeff133cf71b8e06a7b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "post_images"
            ADD CONSTRAINT "FK_cbea080987be6204e913a691aea" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "post_images" DROP CONSTRAINT "FK_cbea080987be6204e913a691aea"
        `);
    await queryRunner.query(`
            ALTER TABLE "post_likes" DROP CONSTRAINT "FK_9b9a7fc5eeff133cf71b8e06a7b"
        `);
    await queryRunner.query(`
            ALTER TABLE "post_likes" DROP CONSTRAINT "FK_b40d37469c501092203d285af80"
        `);
    await queryRunner.query(`
            DROP TABLE "post_images"
        `);
    await queryRunner.query(`
            DROP TABLE "post_likes"
        `);
  }
}
