import { Module } from '@nestjs/common';
import { UserWalletService } from './user-wallet.service';
import { UserWalletController } from './user-wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionNameEnum } from '../infrastructure/database/database.provider';
import { UserWalletEntity } from './entities/UserWallet.entity';
import { UserWalletHistoryEntity } from './entities/UserWalletHistory.entity';
import { AssetEntity } from './entities/Asset.entity';

const typeOrmFeatureConfig = [
  TypeOrmModule.forFeature(
    [UserWalletEntity, UserWalletHistoryEntity, AssetEntity],
    ConnectionNameEnum.ONLY_READ,
  ),
  TypeOrmModule.forFeature(
    [UserWalletEntity, UserWalletHistoryEntity, AssetEntity],
    ConnectionNameEnum.READ_WRITE,
  ),
];

@Module({
  imports: [...typeOrmFeatureConfig],
  providers: [UserWalletService],
  exports: [UserWalletService, ...typeOrmFeatureConfig],
  controllers: [UserWalletController],
})
export class UserWalletModule {}
