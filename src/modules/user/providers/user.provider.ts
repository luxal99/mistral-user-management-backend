import { USER_REPOSITORY_INJECTION_TOKEN } from '../../../config/injection-tokens/config';
import { DataSource } from 'typeorm';
import { FactoryProvider } from '@nestjs/common';
import { User } from '../entity/User';

export const userProvider: FactoryProvider[] = [
  {
    provide: USER_REPOSITORY_INJECTION_TOKEN,
    inject: ['DATA_SOURCE'],
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(User),
  },
];
