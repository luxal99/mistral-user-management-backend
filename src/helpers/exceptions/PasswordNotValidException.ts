import { HttpException, HttpStatus } from "@nestjs/common";
import { Messages } from "../messages/Messages";

export class PasswordNotValidException extends HttpException {
  constructor() {
    super(Messages.PASSWORD_NOT_VALID, HttpStatus.NOT_ACCEPTABLE);
  }
}
