/* eslint-disable prettier/prettier */
import { BaseDto } from './base.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateTodoDto extends BaseDto {
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  title: string;

  @IsOptional()
  @IsString()
  @Length(2)
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  description?: string;

  @IsBoolean()
  completed: boolean;
}
