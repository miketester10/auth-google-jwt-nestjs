/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */

import {
  CanActivate,
  ExecutionContext,
  mixin,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Request } from 'express';

export const AuthorizationRoleGuard = (allowedRoles: string[]) => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();
      const userFromRequest = <JwtPayload>request.user;

      if (userFromRequest.role === Role.ADMIN) return true;

      const result = allowedRoles.includes(userFromRequest.role);

      if (!result) {
        throw new UnauthorizedException("User doesn't have roles to access");
      }
      return result;
    }
  }
  const guard = mixin(RoleGuardMixin);
  return guard;
};
