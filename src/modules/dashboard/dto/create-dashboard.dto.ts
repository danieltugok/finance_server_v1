import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDashboardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  user_id: string;

  @IsNumber()
  @IsOptional()
  row?: number;

  @IsNumber()
  @IsOptional()
  column?: number;

  @IsNumber()
  @IsOptional()
  margin?: number;
}
