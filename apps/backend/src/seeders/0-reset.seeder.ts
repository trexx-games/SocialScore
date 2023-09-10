import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Seeder } from '@jorgebodega/typeorm-seeding';

export default class SettingsSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const queryRunner = await dataSource.createQueryRunner();
    const connection = queryRunner.connection;
    await queryRunner.startTransaction();
    try {
      // const entities = [{ name: 'SettingsEntity', table: 'settings' }];
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
