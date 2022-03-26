import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  private validateUserPermission({ user_id }: IRequest): boolean {
    const user = this.usersRepository.findById(user_id);

    if (user.admin) {
      return true;
    }

    return false;
  }

  execute({ user_id }: IRequest): User[] {
    const userHasPermission = this.validateUserPermission({ user_id });

    if (userHasPermission) {
      return this.usersRepository.list();
    }

    return [];
  }
}

export { ListAllUsersUseCase };
