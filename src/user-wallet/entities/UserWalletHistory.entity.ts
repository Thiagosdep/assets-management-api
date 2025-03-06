import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ValueTransformer,
} from 'typeorm';
import { UserWalletEntity } from './UserWallet.entity';

type AssetDTO = {
  asset_id: string;
  quantity: number;
  purchased_quote: number;
};

export class Asset {
  constructor(partial: Partial<Asset>) {
    Object.assign(this, partial);
  }

  @Column({ nullable: false, name: 'asset_id' })
  assetId: string;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false, name: 'purchased_quote' })
  purchasedQuote: number;
}

const assetTransformer: ValueTransformer = {
  to: (value: Asset[]) => value.map((asset) => JSON.stringify(asset)),
  from: (value: AssetDTO[]) =>
    value.map(
      (asset) =>
        new Asset({
          assetId: asset.asset_id,
          quantity: asset.quantity,
          purchasedQuote: asset.purchased_quote,
        }),
    ),
};

@Entity({ name: 'user_wallet_histories' })
export class UserWalletHistoryEntity {
  constructor(partial: Partial<UserWalletHistoryEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'wallet_id' })
  walletId: string;

  @Column('json', { nullable: false, transformer: assetTransformer })
  assets: Asset[];

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, default: null })
  deletedAt: Date | null;

  @ManyToOne(
    () => UserWalletEntity,
    (userWallet) => userWallet.userWalletHistories,
  )
  @JoinColumn({ name: 'wallet_id' })
  userWallet: UserWalletEntity;
}
