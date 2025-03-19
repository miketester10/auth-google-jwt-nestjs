/* eslint-disable prettier/prettier */
export interface ResponseFormat<T> {
  message: string;
  statusCode: number;
  data?: T; // può essere undefined perche' non tutti gli endpoint sono obbligati a restituire dati
}
