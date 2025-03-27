/* eslint-disable prettier/prettier */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpExceptionBody,
  HttpExceptionBodyMessage,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ErrorResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const responseException: string | object = exception.getResponse();
    const message: HttpExceptionBodyMessage =
      typeof responseException === 'string'
        ? responseException
        : (responseException as HttpExceptionBody).message;

    response.status(statusCode).json({ message, statusCode });
  }
}
