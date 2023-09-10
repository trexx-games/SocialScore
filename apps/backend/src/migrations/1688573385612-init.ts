import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1688573385612 implements MigrationInterface {
  name = 'Init1688573385612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."portal_user_type_enum" AS ENUM('DIRECTOR', 'MANAGER', 'SUPERVISOR')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."portal_user_status_enum" AS ENUM('PENDING', 'ACTIVATED', 'DEACTIVATED')`
    );
    await queryRunner.query(
      `CREATE TABLE "portal_user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" "public"."portal_user_type_enum" NOT NULL DEFAULT 'MANAGER', "username" character varying NOT NULL, "password" character varying NOT NULL, "reference" character varying NOT NULL, "status" "public"."portal_user_status_enum" NOT NULL DEFAULT 'PENDING', "two_factor_secret" character varying, "last_login_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_a759023b471b0d97e88f52ffafe" UNIQUE ("username", "reference"), CONSTRAINT "PK_380b8bd371bf7f09edf24d343f4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('PENDING', 'COMPLETED')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "referral_code" character varying NOT NULL, "referrer_id" integer, "status" "public"."user_status_enum" NOT NULL DEFAULT 'PENDING', "two_factor_secret" character varying, "mpath" character varying DEFAULT '', CONSTRAINT "UQ_90b3e090d44d4e8ea157227e052" UNIQUE ("username", "referral_code"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_1c1cdd6ef02ae157f3ee8f0e5aa" FOREIGN KEY ("referrer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_1c1cdd6ef02ae157f3ee8f0e5aa"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(`DROP TABLE "portal_user"`);
    await queryRunner.query(`DROP TYPE "public"."portal_user_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."portal_user_type_enum"`);
  }
}
