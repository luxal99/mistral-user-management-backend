import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { databaseProviders } from '../../config/database/database.config';
import { userProvider } from './providers/user.provider';

@Module({
  controllers: [UserController],
  providers: [...databaseProviders, ...userProvider, UserService],
})
export class UserModule {}
