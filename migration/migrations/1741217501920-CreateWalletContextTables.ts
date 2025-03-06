import { SetRole } from '../set-role.decorator';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWalletContextTables1741217501920
  implements MigrationInterface
{
  @SetRole()
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE assets_management_api.assets (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              name VARCHAR(255) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL
          );
    
          CREATE TABLE assets_management_api.user_wallets (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              user_id UUID NOT NULL,
              name VARCHAR(255) NOT NULL,
              active BOOLEAN NOT NULL DEFAULT TRUE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_user_wallets_user FOREIGN KEY (user_id) REFERENCES assets_management_api.users(id) ON DELETE CASCADE
          );
    
          CREATE TABLE assets_management_api.user_wallet_histories (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              wallet_id UUID NOT NULL,
              assets JSON NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              deleted_at TIMESTAMP NULL,
              CONSTRAINT fk_wallet_history_wallet FOREIGN KEY (wallet_id) REFERENCES assets_management_api.user_wallets(id) ON DELETE CASCADE
          );
        `);
  }

  @SetRole()
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TABLE IF EXISTS assets_management_api.user_wallet_histories;
          DROP TABLE IF EXISTS assets_management_api.user_wallets;
          DROP TABLE IF EXISTS assets_management_api.assets;
        `);
  }
}
