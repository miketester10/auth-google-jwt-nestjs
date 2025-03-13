/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
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

@UseInterceptors(SuccessResponseInterceptor)
@UseGuards(JwtAuthGuard, AuthorizationRoleGuard([Role.USER]))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() payload: JwtPayload,
  ): Promise<Todo> {
    return this.todoService.findOne(+id, payload.sub);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
