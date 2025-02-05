/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/JWT/guards/jwt.guards';
import { UserService } from './user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@CurrentUser() providerId: string) {
    return this.userService.profile(providerId);
  }
}
