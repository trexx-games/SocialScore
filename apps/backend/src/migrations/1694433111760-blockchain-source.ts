import { MigrationInterface, QueryRunner } from 'typeorm';

export class BlockchainSource1694433111760 implements MigrationInterface {
  name = 'BlockchainSource1694433111760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."blockchain_source_status_enum" AS ENUM('ACTIVATED', 'DEACTIVATED')`
    );
    await queryRunner.query(
      `CREATE TABLE "blockchain_source" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "address" character varying NOT NULL, "description" character varying, "meta" jsonb NOT NULL DEFAULT '{}', "status" "public"."blockchain_source_status_enum" NOT NULL DEFAULT 'ACTIVATED', CONSTRAINT "UQ_03c46b7a1e1a2d598ecb78e0bba" UNIQUE ("address"), CONSTRAINT "PK_0dca4bf41739a4e656e4daf85f7" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "blockchain_source"`);
    await queryRunner.query(
      `DROP TYPE "public"."blockchain_source_status_enum"`
    );
  }
}
