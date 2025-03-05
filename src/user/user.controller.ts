import { Controller, Get, Param } from '@nestjs/common';
import { UserDTO } from './dtos/user.controller.dto';
import { UserService } from './user.service';
import { UserAdapter } from './adapters/user.adapter';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async get(@Param('id') id: string): Promise<UserDTO> {
    const user = await this.userService.get(id);
    return UserAdapter.toUserDTO(user);
  }
}
