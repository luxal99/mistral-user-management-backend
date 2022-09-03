import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { PasswordNotValidException } from "../exceptions/PasswordNotValidException";
import { Response } from "express";

@Catch(PasswordNotValidException)
export class PasswordNotValidExceptionFilter implements ExceptionFilter {
  catch(exception: PasswordNotValidException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.send({
      statusCode: exception.getStatus(),
      message: exception.message,
    });
  }
}
