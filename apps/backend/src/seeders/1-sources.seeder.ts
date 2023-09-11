import { BlockchainSourceEntity } from '@apps/modules/blockchain-source/blockchain-source.entity';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BlockchainSourceDataSeedData } from './data/1-sources.seeder.data';

export default class SettingsSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const queryRunner = await dataSource.createQueryRunner();
    const connection = queryRunner.connection;
    const repo = connection.getRepository(BlockchainSourceEntity);
    await queryRunner.startTransaction();
    try {
      const count = await repo.count();
      if (count > 0) return;
      await Promise.all([
        ...BlockchainSourceDataSeedData.map(async (e) => repo.save(e)),
      ]);
    } catch (err) {
      Logger.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
