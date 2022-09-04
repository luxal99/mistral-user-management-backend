import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './providers/user.service';
import { User } from './entity/User';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserAlreadyExistsExceptionFilter } from '../../helpers/http-filters/UserAlreadyExistsExceptionFIlter';
import { UserAlreadyExistsException } from '../../helpers/exceptions/UserAlreadyExistsException';
import { JwtService } from '@nestjs/jwt';
import {
  AUTHORIZATION_HEADER,
  TOTAL_RESULTS,
} from '../../config/constants/constants';
import { UserNotFoundException } from '../../helpers/exceptions/UserNotFoundException';
import { UserNotFoundExceptionFilter } from '../../helpers/http-filters/UserNotFoundExceptionFilter';
import { PasswordNotValidExceptionFilter } from '../../helpers/http-filters/PasswordNotValidExceptionFilter';
import { PasswordNotValidException } from '../../helpers/exceptions/PasswordNotValidException';
import { UserQuery } from '../../helpers/models/query/UserQuery';
import { UserInfo } from '../user-info/entity/UserInfo';
import { Permission } from '../permission/entity/Permission';
import { JwtGuard } from '../../helpers/guard/jwt.guard';
import { DefaultBadRequestException } from '../../helpers/exceptions/DefaultBadRequestException';
import { QueryFailedError } from 'typeorm';
import { DefaultBadRequestExceptionFilter } from '../../helpers/http-filters/DefaultBadRequestExceptionFilter';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/auth')
  @UseFilters(new PasswordNotValidExceptionFilter())
  @UseFilters(new UserNotFoundExceptionFilter())
  async auth(@Body() user: User, @Res() resp: Response): Promise<void> {
    const userByUsername = await this.userService.findByUsername(user.username);

    if (!userByUsername) {
      throw new UserNotFoundException();
    } else {
      const isPasswordValid = await bcrypt.compare(
        user.password,
        userByUsername.password,
      );
      if (isPasswordValid) {
        const token = this.jwtService.sign({
          username: userByUsername.username,
          permissions: userByUsername.permissions,
        });
        resp.setHeader(AUTHORIZATION_HEADER, token);
        resp.send({
          username: userByUsername.username,
          permissions: userByUsername.permissions,
          idUserInfo: userByUsername.idUserInfo,
        });
      } else {
        throw new PasswordNotValidException();
      }
    }
  }

  @Post()
  @UseFilters(new UserAlreadyExistsExceptionFilter())
  async registerUser(@Body() user: User, @Res() res: Response) {
    try {
      user.password = await bcrypt.hash(user.username + '123', 10);
      res.send(await this.userService.createUser(user));
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.driverError['code'] === 'ER_DUP_ENTRY'
      ) {
        throw new UserAlreadyExistsException();
      } else {
        throw new DefaultBadRequestException();
      }
    }
  }

  @Put()
  @UseGuards(JwtGuard)
  @UseFilters(new UserAlreadyExistsExceptionFilter())
  @UseFilters(new DefaultBadRequestExceptionFilter())
  async updateUser(
    @Body() userInfo: UserInfo,
    @Res() res: Response,
    @Query('username') username: string,
  ) {
    try {
      res.send(await this.userService.update(username, userInfo));
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.driverError['code'] === 'ER_DUP_ENTRY'
      ) {
        throw new UserAlreadyExistsException();
      } else {
        throw new DefaultBadRequestException();
      }
    }
  }

  @UseGuards(JwtGuard)
  @Put('permissions')
  @UseFilters(new UserAlreadyExistsExceptionFilter())
  async updateUserPermissions(
    @Body() permissions: Permission[],
    @Res() res: Response,
    @Query('username') username: string,
  ) {
    try {
      res.send(await this.userService.updatePermission(username, permissions));
    } catch (err) {
      throw new UserAlreadyExistsException();
    }
  }

  @UseGuards(JwtGuard)
  @Get()
  async getUsers(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: UserQuery,
  ) {
    const users: [User[], number] = await this.userService.getUsers(query);
    res.setHeader(TOTAL_RESULTS, users[1]);
    res.send(users[0]);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      res.send(await this.userService.deleteUser(id));
    } catch (err) {
      throw new DefaultBadRequestException();
    }
  }

  @Get('by-username')
  @UseGuards(JwtGuard)
  async findUserByUserName(
    @Query('username') username: string,
    @Res() res: Response,
  ) {
    try {
      res.send(await this.userService.findByUsername(username));
    } catch (err) {
      throw new DefaultBadRequestException();
    }
  }
}
