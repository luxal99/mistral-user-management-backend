import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PasswordNotValidException } from '../exceptions/PasswordNotValidException';
import { Response } from 'express';

@Catch(PasswordNotValidException)
export class PasswordNotValidExceptionFilter implements ExceptionFilter {
  catch(exception: PasswordNotValidException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).send({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
