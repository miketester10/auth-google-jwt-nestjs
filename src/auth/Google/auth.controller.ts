/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */

import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './auth.service';
import { GoogleOAuthGuard } from './guards/auth.guard';
import { CustomReq } from '../../common/decorators/custom-req.decorator';
import { Token } from '../../common/interfaces/token.interface';

@Controller('auth/google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get('/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@CustomReq() token: Token, @Res() res: Response) {
    // console.log(token.jwt);
    return res.redirect(`http://localhost:3000/dashboard?token=${token.jwt}`);
  }
}
