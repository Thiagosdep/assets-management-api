import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { UserEntity } from '../../user/entities/User.entity';
import { UserWalletEntity } from '../../user-wallet/entities/UserWallet.entity';
import { UserWalletHistoryEntity } from '../../user-wallet/entities/UserWalletHistory.entity';
import { AssetEntity } from '../../user-wallet/entities/Asset.entity';

export enum ConnectionNameEnum {
  READ_WRITE = 'READ_WRITE',
  ONLY_READ = 'ONLY_READ',
}

export const databaseProviders = (
  connectionName: ConnectionNameEnum,
): TypeOrmModuleAsyncOptions => {
  return {
    name: connectionName,
    imports: [AppConfigModule],
    useFactory: (appConfigService: AppConfigService) => {
      const {
        hostReadWrite,
        hostOnlyRead,
        port,
        username,
        password,
        database,
        schema,
      } = appConfigService.database;
      const host =
        connectionName === ConnectionNameEnum.READ_WRITE
          ? hostReadWrite
          : hostOnlyRead;
      return {
        name: connectionName,
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        schema,
        entities: [
          UserEntity,
          UserWalletEntity,
          UserWalletHistoryEntity,
          AssetEntity,
        ],
        synchronize: false,
        logging: false,
      };
    },
    inject: [AppConfigService],
  };
};
