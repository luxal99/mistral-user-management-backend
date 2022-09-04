import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { DefaultBadRequestException } from '../exceptions/DefaultBadRequestException';

@Catch(DefaultBadRequestException)
export class DefaultBadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: DefaultBadRequestException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).send({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
