import { Messages } from '../messages/Messages';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(Messages.USER_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
  }
}
