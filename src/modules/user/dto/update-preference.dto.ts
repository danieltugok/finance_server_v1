// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

class UpdatePreferenceObjectDto {
  @IsBoolean()
  @IsOptional()
  isDark?: boolean;

  @IsString()
  @IsOptional()
  language?: string;

  @IsUUID()
  @IsOptional()
  dashboard_id?: string;
}

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdatePreferenceDto {
  @IsOptional()
  preference?: UpdatePreferenceObjectDto;
}
