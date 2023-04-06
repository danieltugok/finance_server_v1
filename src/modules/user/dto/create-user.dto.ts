import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../validation/uniqueEmail.validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User Name',
    example: 'John Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'User Authentication e-mail',
    example: 'johndoe@gmail.com',
    required: true,
  })
  @IsEmail(undefined, { message: 'Email is invalid' })
  @IsNotEmpty()
  @UniqueEmail({ message: 'This e-mail already exists' }) // Custom validation
  email: string;

  @ApiProperty({
    description: 'The User Password',
    example: '123456',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
