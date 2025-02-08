/* eslint-disable prettier/prettier */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user; // quì dentro c'è il GoogleUser passato dalla funzione validate(...) della classe GoogleStrategy oppure il Payload decodificato passato dalla funzione validate(...) della classe JwtStrategy
  },
);
