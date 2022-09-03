import { PERMISSION_REPOSITORY_INJECTION_TOKEN } from '../../../config/injection-tokens/config';
import { DataSource } from 'typeorm';
import { Permission } from '../entity/Permission';
import { FactoryProvider } from '@nestjs/common';

export const permissionProvider: FactoryProvider[] = [
  {
    provide: PERMISSION_REPOSITORY_INJECTION_TOKEN,
    inject: ['DATA_SOURCE'],
    useFactory: async (dataSource: DataSource) =>
      dataSource.getRepository(Permission),
  },
];
