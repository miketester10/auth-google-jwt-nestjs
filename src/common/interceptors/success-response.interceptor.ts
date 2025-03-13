/* eslint-disable prettier/prettier */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { ResponseFormat } from '../interfaces/response-format.interface';

@Injectable() // T is the type of data that will be returned by the handler (controller)
// first T is the type of data that will be returned by the handler (controller), second T is the type of data that will be returned by the interceptor.
export class SuccessResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const statusCode = context
      .switchToHttp()
      .getResponse<Response>().statusCode;

    return next.handle().pipe(
      map((data: T) => {
        const response: ResponseFormat<T> = {
          message: 'Success',
          statusCode: statusCode,
          data: data,
        };
        return response;
      }),
    );
  }
}
