/* eslint-disable prettier/prettier */
export interface ResponseFormat<T> {
  message: string;
  statusCode: number;
  data: T;
}
