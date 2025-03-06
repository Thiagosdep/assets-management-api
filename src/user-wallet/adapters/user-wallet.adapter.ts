import { UserWalletDTO } from '../dtos/user-wallet.controller.dto';
import { UserWalletEntity } from '../entities/UserWallet.entity';

export class UserWalletAdapter {
  static toUserWalletDTO(userWallet: UserWalletEntity): UserWalletDTO {
    console.log({
      userWalletHistories: userWallet.userWalletHistories[0].assets,
    });
    return {
      id: userWallet.id,
      name: userWallet.name,
      active: userWallet.active,
      assets: userWallet.userWalletHistories.flatMap((history) =>
        history.assets.map((asset) => ({
          asset_id: asset.assetId,
          quantity: asset.quantity,
          purchased_quote: asset.purchasedQuote,
        })),
      ),
    };
  }
}
