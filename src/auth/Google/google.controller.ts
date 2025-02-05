/* eslint-disable prettier/prettier */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './guards/google.guard';
import { JwtAuthService } from '../JWT/jwt.service';
import { GoogleUser } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(
    @CurrentUser() user: GoogleUser,
  ): Promise<{ token: string; user: GoogleUser }> {
    const token = await this.jwtAuthService.signToken(user);
    return { token, user };
  }
}
