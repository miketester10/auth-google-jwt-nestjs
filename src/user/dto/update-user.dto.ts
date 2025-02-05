/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  @Length(2, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  lastName?: string;

  @IsOptional()
  @IsString()
  @Length(10)
  @Transform(({ value }) => typeof value === 'string' && value.trim())
  picture?: string;
}
