import { Body, Controller, Post, Res, UseFilters } from "@nestjs/common";
import { UserService } from "./providers/user.service";
import { User } from "./entity/User";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { UserAlreadyExistsExceptionFilter } from "../../helpers/http-filters/UserAlreadyExistsExceptionFIlter";
import { UserAlreadyExistsException } from "../../helpers/exceptions/UserAlreadyExistsException";
import { JwtService } from "@nestjs/jwt";
import { AUTHORIZATION_HEADER } from "../../config/constants/constants";
import { UserNotFoundException } from "../../helpers/exceptions/UserNotFoundException";
import { UserNotFoundExceptionFilter } from "../../helpers/http-filters/UserNotFoundExceptionFilter";
import { PasswordNotValidExceptionFilter } from "../../helpers/http-filters/PasswordNotValidExceptionFilter";
import { PasswordNotValidException } from "../../helpers/exceptions/PasswordNotValidException";

@Controller("user")
export class UserController {
  constructor(private userService: UserService,
              private jwtService: JwtService
  ) {
  }

  @Post("/auth")
  @UseFilters(new PasswordNotValidExceptionFilter())
  @UseFilters(new UserNotFoundExceptionFilter())
  async auth(@Body() user: User, @Res() resp: Response): Promise<void> {
    const userByUsername = await this.userService.findByUsername(user.username);

    if (!userByUsername) {
      throw new UserNotFoundException();
    } else {
      const isPasswordValid = await bcrypt.compare(
        user.password,
        userByUsername.password
      );
      if (isPasswordValid) {
        const token = this.jwtService.sign({
          username: userByUsername.username,
        });
        resp.setHeader(AUTHORIZATION_HEADER, token);
        resp.send(user);
      } else {
        throw new PasswordNotValidException();
      }
    }
  }


  @Post()
  @UseFilters(new UserAlreadyExistsExceptionFilter())
  async registerUser(@Body() user: User, @Res() res: Response) {
    try {
      user.password = await bcrypt.hash(user.username + "123", 10);
      res.send(await this.userService.createUser(user));
    } catch (err) {
      throw new UserAlreadyExistsException();
    }
  }
}
