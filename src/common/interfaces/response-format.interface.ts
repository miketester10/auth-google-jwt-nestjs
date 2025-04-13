/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { HttpExceptionBodyMessage } from '@nestjs/common';

interface ResponseBase<MessageType = string> {
  message: MessageType;
  statusCode: number;
}

export interface ResponseSuccess<T> extends ResponseBase {
  data?: T; // può essere undefined perche' non tutti gli endpoint sono obbligati a restituire dati
}

export interface ResponseError extends ResponseBase<HttpExceptionBodyMessage> {}
