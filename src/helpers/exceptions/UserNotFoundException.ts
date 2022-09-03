import { HttpException, HttpStatus } from "@nestjs/common";
import { Messages } from "../messages/Messages";
export class UserNotFoundException extends HttpException {
  constructor() {
    super(Messages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
