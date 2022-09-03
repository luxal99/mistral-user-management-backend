import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './providers/user.service';
import { databaseProviders } from '../../config/database/database.config';
import { userProvider } from './providers/user.provider';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "../../helpers/jwt/jwt.strategy";
import { CONFIG } from "../../config/environment/environment.config";

@Module({
  imports:[
    CONFIG,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: "3h" },
    }),

  ],
  controllers: [UserController],
  providers: [...databaseProviders, ...userProvider,JwtStrategy, UserService],
})
export class UserModule {}
