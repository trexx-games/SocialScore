import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAndWallet1694420545329 implements MigrationInterface {
  name = 'UserAndWallet1694420545329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_1c1cdd6ef02ae157f3ee8f0e5aa"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_90b3e090d44d4e8ea157227e052"`
    );
    await queryRunner.query(
      `CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "address" character varying NOT NULL, "parent_id" integer, "last_sync_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_1dcc9f5fd49e3dc52c6d2393c53" UNIQUE ("address"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "referral_code"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "referrer_id"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "two_factor_secret"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mpath"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "address" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "last_sync_date" TIMESTAMP WITH TIME ZONE`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_53e6a8d298e4d2d544576cd9584" UNIQUE ("address", "username")`
    );
    await queryRunner.query(
      `ALTER TABLE "wallet" ADD CONSTRAINT "FK_98aef5aa7e8da913b1b0620e43d" FOREIGN KEY ("parent_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wallet" DROP CONSTRAINT "FK_98aef5aa7e8da913b1b0620e43d"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_53e6a8d298e4d2d544576cd9584"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_sync_date"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "mpath" character varying DEFAULT ''`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "two_factor_secret" character varying`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('PENDING', 'COMPLETED')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL DEFAULT 'PENDING'`
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "referrer_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "referral_code" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "last_name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "first_name" character varying NOT NULL`
    );
    await queryRunner.query(`DROP TABLE "wallet"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_90b3e090d44d4e8ea157227e052" UNIQUE ("username", "referral_code")`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_1c1cdd6ef02ae157f3ee8f0e5aa" FOREIGN KEY ("referrer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
