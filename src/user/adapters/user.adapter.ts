import { UserEntity } from '../entities/User.entity';
import { UserDTO } from '../dtos/user.controller.dto';

export class UserAdapter {
  static toUserDTO(user: UserEntity): UserDTO {
    return {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      phone_number: user.phoneNumber,
    };
  }
}
