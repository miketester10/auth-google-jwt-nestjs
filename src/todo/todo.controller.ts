/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  Put,
  ParseIntPipe
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { SuccessResponseInterceptor } from 'src/common/interceptors/success-response.interceptor';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { Todo } from './entities/todo.entity';
import { JwtAuthGuard } from 'src/auth/JWT/guards/jwt.guards';
import { AuthorizationRoleGuard } from 'src/common/guards/authorization-role.guard';
import { Role } from 'src/common/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiBearerAuth()
@SkipThrottle({ auth: true })
@UseGuards(JwtAuthGuard, AuthorizationRoleGuard([Role.USER]))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @CurrentUser() payload: JwtPayload,
  ): Promise<Todo> {
    return this.todoService.create(createTodoDto, payload.sub);
  }

  @Get()
  async findAll(@CurrentUser() payload: JwtPayload): Promise<Todo[]> {
    return this.todoService.findAll(payload.sub);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
    @CurrentUser() payload: JwtPayload,
  ): Promise<Todo> {
    return this.todoService.findOne(+id, payload.sub);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @CurrentUser() payload: JwtPayload,
  ): Promise<Todo> {
    return this.todoService.update(+id, updateTodoDto, payload.sub);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
    @CurrentUser() payload: JwtPayload,
  ): Promise<Todo> {
    return this.todoService.remove(+id, payload.sub);
  }
}
