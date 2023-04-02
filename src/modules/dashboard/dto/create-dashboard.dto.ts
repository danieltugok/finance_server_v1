import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDashboardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  user_id: string;
}
