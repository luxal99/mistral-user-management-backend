import { HttpException, HttpStatus } from '@nestjs/common';
import { Messages } from '../messages/Messages';

export class DefaultBadRequestException extends HttpException {
  constructor() {
    super(Messages.BAD_REQUEST, HttpStatus.BAD_REQUEST);
  }
}
