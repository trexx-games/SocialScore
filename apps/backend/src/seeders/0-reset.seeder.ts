import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

export default class ResetSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const queryRunner = await dataSource.createQueryRunner();
    const connection = queryRunner.connection;
    await queryRunner.startTransaction();
    try {
      // const entities = [{ name: 'BlockchainSourceEntity', table: 'blockchain_source' }];
      const entities = [];
      for (const entity of entities) {
        const repository = await connection.getRepository(entity.name);
        await repository.query(
          `TRUNCATE "${entity.table}" RESTART IDENTITY CASCADE;`
        );
      }
    } catch (err) {
      Logger.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
