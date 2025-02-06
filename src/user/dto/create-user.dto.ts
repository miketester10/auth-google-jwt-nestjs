/* eslint-disable prettier/prettier */
import { BaseDto } from './base.dto';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class CreateUserDto extends BaseDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  lastName?: string;

  @IsOptional()
  @IsString()
  @Length(10)
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  picture?: string;
}
