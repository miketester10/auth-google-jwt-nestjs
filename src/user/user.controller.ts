/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/JWT/guards/jwt.guards';
import { UserService } from './user.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { GoogleUser } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { AuthorizationRoleGuard } from 'src/common/guards/authorization-role.guard';
import { Role } from 'src/common/enums/role.enum';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AuthorizationRoleGuard([Role.USER]))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async findOne(@CurrentUser() payload: JwtPayload): Promise<GoogleUser> {
    return this.userService.findOne(payload.sub);
  }

  @Put('profile')
  async update(
    @CurrentUser() payload: JwtPayload,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GoogleUser> {
    return this.userService.update(payload.sub, updateUserDto);
  }

  @Delete('profile')
  async remove(@CurrentUser() payload: JwtPayload): Promise<GoogleUser> {
    return this.userService.remove(payload.sub);
  }

  @UseGuards(AuthorizationRoleGuard([Role.ADMIN]))
  @Get()
  async findAll(): Promise<GoogleUser[]> {
    return this.userService.findAll();
  }
}
