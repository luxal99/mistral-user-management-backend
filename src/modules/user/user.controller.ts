import { Body, Controller, Post, Res, UseFilters } from "@nestjs/common";
import { UserService } from "./providers/user.service";
import { User } from "./entity/User";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { UserAlreadyExistsExceptionFilter } from "../../helpers/http-filters/UserAlreadyExistsExceptionFIlter";
import { UserAlreadyExistsException } from "../../helpers/exceptions/UserAlreadyExistsException";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {
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
