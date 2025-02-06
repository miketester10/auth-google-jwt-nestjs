/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/JWT/guards/jwt.guards';
import { UserService } from './user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GoogleUser } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @CurrentUser() providerId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GoogleUser> {
    return await this.userService.update(providerId, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@CurrentUser() providerId: string): Promise<GoogleUser> {
    return await this.userService.delete(providerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@CurrentUser() providerId: string): Promise<GoogleUser> {
    return await this.userService.profile(providerId);
  }
}
