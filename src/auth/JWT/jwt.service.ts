/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { GoogleUser } from 'src/user/entities/user.entity';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  async signToken(user: GoogleUser): Promise<string> {
    const payload: JwtPayload = {
      sub: user.providerId,
      role: user.role,
    };

    return await this.jwtService.signAsync(payload);
  }
}
