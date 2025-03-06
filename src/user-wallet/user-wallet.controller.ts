import { Controller, Get, Param } from '@nestjs/common';
import { UserWalletService } from './user-wallet.service';
import { UserWalletDTO } from './dtos/user-wallet.controller.dto';
import { UserWalletAdapter } from './adapters/user-wallet.adapter';

@Controller({ path: 'users/wallets', version: '1' })
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @Get('/:id')
  async get(@Param('id') id: string): Promise<UserWalletDTO> {
    const userWallet = await this.userWalletService.get(id);
    return UserWalletAdapter.toUserWalletDTO(userWallet);
  }
}
