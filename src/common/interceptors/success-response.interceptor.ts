/* eslint-disable prettier/prettier */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';
import { ResponseSuccess } from '../interfaces/response-format.interface';

@Injectable() 
export class SuccessResponseInterceptor<T> // T is the type of data that will be returned by the handler (controller)
  implements NestInterceptor<T, ResponseSuccess<T>> // first T is the type of data that will be returned by the handler (controller), second T is the type of data that will be returned by the interceptor.
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseSuccess<T>> {
    const statusCode = context
      .switchToHttp()
      .getResponse<Response>().statusCode;

    return next.handle().pipe(
      map((data?: T): ResponseSuccess<T> => {
        const responseSuccessBody: ResponseSuccess<T> = {
          message: 'Success',
          statusCode: statusCode,
          data: data,
        };
        return responseSuccessBody;
      }),
    );
  }
}
