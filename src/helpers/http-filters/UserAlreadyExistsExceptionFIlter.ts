import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { UserAlreadyExistsException } from "../exceptions/UserAlreadyExistsException";

@Catch(UserAlreadyExistsException)
export class UserAlreadyExistsExceptionFilter implements ExceptionFilter {
  catch(exception: UserAlreadyExistsException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.send({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
