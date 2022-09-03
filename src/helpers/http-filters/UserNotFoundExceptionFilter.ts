import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { Response } from "express";

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: UserNotFoundException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.send({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
