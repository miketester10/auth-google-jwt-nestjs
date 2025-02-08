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

export const AuthorizationRoleGuard = (allowedRoles: string[]) => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const { user }: { user: JwtPayload } = context
        .switchToHttp()
        .getRequest();

      if (user.role === Role.ADMIN) return true;

      const result = allowedRoles.includes(user.role);

      if (!result) {
        throw new UnauthorizedException("User doesn't have roles to access");
      }
      return result;
    }
  }
  const guard = mixin(RoleGuardMixin);
  return guard;
};
