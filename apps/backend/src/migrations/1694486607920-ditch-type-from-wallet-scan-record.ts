import { MigrationInterface, QueryRunner } from 'typeorm';

export class DitchTypeFromWalletScanRecord1694486607920
  implements MigrationInterface
{
  name = 'DitchTypeFromWalletScanRecord1694486607920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" RENAME COLUMN "type" TO "meta"`
    );
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" DROP COLUMN "meta"`
    );
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" ADD "meta" jsonb NOT NULL DEFAULT '{}'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" DROP COLUMN "meta"`
    );
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" ADD "meta" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "wallet_scan_record" RENAME COLUMN "meta" TO "type"`
    );
  }
}
