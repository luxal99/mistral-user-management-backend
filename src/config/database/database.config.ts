import { DataSource } from 'typeorm';
import { DATABASE_INJECTION_TOKEN } from '../injection-tokens/config';
import { User } from '../../modules/user/entity/User';
import { UserInfo } from '../../modules/user-info/entity/UserInfo';
import { Permission } from '../../modules/permission/entity/Permission';

export const databaseProviders = [
  {
    provide: DATABASE_INJECTION_TOKEN,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        host: 'localhost',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [Permission, User, UserInfo],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];
