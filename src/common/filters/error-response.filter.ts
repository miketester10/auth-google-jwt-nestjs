/* eslint-disable prettier/prettier */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpExceptionBody,
  HttpExceptionBodyMessage,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorResponseFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // messaggio di default per tutti gli errori
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: HttpExceptionBodyMessage = 'Internal server error';

    // messaggio personalizzato per gli errori HTTP
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const responseException: string | object = exception.getResponse();
      message =
        typeof responseException === 'string'
          ? responseException
          : (responseException as HttpExceptionBody).message;
    } else if (exception instanceof Error) {
      // messaggio personalizzato per gli errori di TypeScript
      message = exception.message;
    }

    response.status(statusCode).json({ message, statusCode });
  }
}
