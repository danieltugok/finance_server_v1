import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateGridItemDto {
  @IsNumber()
  @IsNotEmpty()
  axis_x: number;

  @IsNumber()
  @IsNotEmpty()
  axis_y: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsString()
  @IsOptional()
  content?: string;

  @IsUUID()
  @IsNotEmpty()
  dashboard_id: string;

  @IsUUID()
  @IsNotEmpty()
  widget_id: string;
}
