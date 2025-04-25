/* eslint-disable prettier/prettier */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { GoogleUser } from 'src/user/entities/user.entity';

type CurrentUser = GoogleUser | JwtPayload;

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CurrentUser => {
    const request = context.switchToHttp().getRequest<Request>();
    const userFromRequest = <CurrentUser>request.user; // quì dentro c'è il GoogleUser passato dalla funzione validate(...) della classe GoogleStrategy oppure il Payload decodificato passato dalla funzione validate(...) della classe JwtStrategy
    return userFromRequest;
  },
);
