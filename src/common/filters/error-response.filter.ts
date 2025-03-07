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
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.getStatus() === HttpStatus.TOO_MANY_REQUESTS) {
      response.status(HttpStatus.TOO_MANY_REQUESTS).json({
        message: 'API rate limit exceeded. Please try again later.',
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
      });
    } else {
      const responseException = <HttpExceptionBody>exception.getResponse();
      const { message, statusCode } = responseException;
      response.status(exception.getStatus()).json({ message, statusCode });
    }
  }
}
