import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../validation/uniqueEmail.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail(undefined, { message: 'Email is invalid' })
  @IsNotEmpty()
  @UniqueEmail({ message: 'This e-mail already exists' }) // Custom validation
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
