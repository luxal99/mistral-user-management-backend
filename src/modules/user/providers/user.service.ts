import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_INJECTION_TOKEN } from '../../../config/injection-tokens/config';
import { Repository } from 'typeorm';
import { User } from '../entity/User';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_INJECTION_TOKEN)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
