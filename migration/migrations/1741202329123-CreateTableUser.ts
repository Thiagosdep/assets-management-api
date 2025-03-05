import { SetRole } from '../set-role.decorator';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1741202329123 implements MigrationInterface {
  @SetRole()
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              name VARCHAR NOT NULL,
              cpf VARCHAR UNIQUE NOT NULL,
              email VARCHAR UNIQUE NOT NULL,
              phone_number VARCHAR UNIQUE NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
              deleted_at TIMESTAMP NULL DEFAULT NULL
            );
          `);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }

  @SetRole()
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`DROP TABLE IF EXISTS users CASCADE;`);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
