export type AssetDTO = {
  asset_id: string;
  quantity: number;
  purchased_quote: number;
};

export type UserWalletDTO = {
  id: string;
  name: string;
  active: boolean;
  assets: AssetDTO[];
};
