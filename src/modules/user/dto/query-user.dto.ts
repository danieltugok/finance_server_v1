import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { UniqueEmail } from '../validation/uniqueEmail.validator';

export class QueryUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  deleted?: boolean;

  @IsString()
  @IsOptional()
  paginator?: boolean;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  order?: string;

  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  start_date?: string;

  @IsString()
  @IsOptional()
  end_date?: string;
}
