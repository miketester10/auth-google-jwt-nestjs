/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  HttpExceptionBody,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ErrorResponseFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const responseException: string | object = exception.getResponse();
    let message =
      typeof responseException === 'string'
        ? responseException
        : (responseException as HttpExceptionBody).message;

    if (statusCode === HttpStatus.TOO_MANY_REQUESTS) {
      message = 'API rate limit exceeded. Please try again later.';
    }

    response.status(statusCode).json({ message, statusCode });
  }
}
