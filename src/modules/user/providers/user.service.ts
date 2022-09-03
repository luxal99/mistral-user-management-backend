import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY_INJECTION_TOKEN } from '../../../config/injection-tokens/config';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/User';
import { UserQuery } from '../../../helpers/models/query/UserQuery';
import { UserInfo } from '../../user-info/entity/UserInfo';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_INJECTION_TOKEN)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['permissions', 'idUserInfo'],
    });
  }

  async findByUsernameWithoutPermission(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['idUserInfo'],
    });
  }

  async update(username: string, userInfo: UserInfo): Promise<any> {
    const userForUpdate: User = await this.findByUsernameWithoutPermission(
      username,
    );
    Object.assign(userForUpdate.idUserInfo, userInfo);
    return await this.userRepository.save(userForUpdate);
  }

  async getUsers(query: UserQuery): Promise<[User[], number]> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.idUserInfo', 'idUserInfo')
      .take(10)
      .skip(query.page * 10);

    if (query.search) {
      queryBuilder.where(
        `user.username like :search or 
        idUserInfo.firstName like :search or
         idUserInfo.lastName like :search or 
         idUserInfo.email like :search`,
        { search: `%${query.search}%` },
      );
    }

    if (query.orderBy && query.orderByDirection) {
      queryBuilder.orderBy(query.orderBy, query.orderByDirection);
    }

    return await queryBuilder.getManyAndCount();
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete({ id });
  }
}
