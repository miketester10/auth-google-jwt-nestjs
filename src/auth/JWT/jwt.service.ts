/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser } from 'src/user/entities/user.entity';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  async signToken(user: GoogleUser): Promise<string> {
    const payload = {
      sub: user.providerId,
    };

    return await this.jwtService.signAsync(payload);
  }
}
