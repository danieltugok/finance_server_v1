import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWidgetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsNotEmpty()
  component: string;

  @IsNumber()
  @IsOptional()
  min_width?: number;

  @IsNumber()
  @IsOptional()
  min_height?: number;

  @IsNumber()
  @IsOptional()
  max_width?: number;

  @IsNumber()
  @IsOptional()
  max_height?: number;
}
