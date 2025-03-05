import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema1741197764840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`
        DO $$ 
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'schema_assets_management_api') THEN
            CREATE ROLE schema_assets_management_api;
          END IF;
        END $$;
      `);

      await queryRunner.query(
        `CREATE SCHEMA IF NOT EXISTS assets_management_api AUTHORIZATION schema_assets_management_api;`,
      );

      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `DROP SCHEMA IF EXISTS assets_management_api CASCADE;`,
      );
      await queryRunner.query(
        `DROP ROLE IF EXISTS schema_assets_management_api;`,
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
