/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleOAuthGuard } from './guards/auth.guard';
// import { CustomReq } from '../../common/decorators/custom-req.decorator';
// import { Token } from '../../common/interfaces/token.interface';

@Controller('auth/google')
export class AppController {
  constructor() {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Req() req: Request) {
    return req.user;
  }
}
