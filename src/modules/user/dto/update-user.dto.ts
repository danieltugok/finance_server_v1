// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { UniqueEmail } from '../validation/uniqueEmail.validator';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail(undefined, { message: 'Email is invalid' })
  @UniqueEmail({ message: 'This e-mail already exists' }) // Custom validation
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @IsOptional()
  password?: string;
}
