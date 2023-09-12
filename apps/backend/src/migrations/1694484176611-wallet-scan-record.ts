import { MigrationInterface, QueryRunner } from 'typeorm';

export class WalletScanRecord1694484176611 implements MigrationInterface {
  name = 'WalletScanRecord1694484176611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wallet_scan_record" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" character varying NOT NULL, "block" integer NOT NULL, "tx_hash" character varying NOT NULL, "source_id" integer NOT NULL, "wallet_id" integer NOT NULL, CONSTRAINT "UQ_876e73f55779ae79a61ef4b5db2" UNIQUE ("tx_hash"), CONSTRAINT "PK_11f6c4f4e08ed6468b5ec5a4501" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" ADD CONSTRAINT "FK_4e9219465fa32a165d56e8827c3" FOREIGN KEY ("source_id") REFERENCES "blockchain_source"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" ADD CONSTRAINT "FK_192a469db5b304ca1067ccf3579" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" DROP CONSTRAINT "FK_192a469db5b304ca1067ccf3579"`
    );
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" DROP CONSTRAINT "FK_4e9219465fa32a165d56e8827c3"`
    );
    await queryRunner.query(`DROP TABLE "wallet_scan_record"`);
  }
}
