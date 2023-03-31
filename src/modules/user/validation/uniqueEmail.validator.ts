import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ name: 'uniqueEmail', async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(
    email: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (user) return false;
  }

  //   defaultMessage?(validationArguments?: ValidationArguments): string {
  //     throw new Error('Method not implemented.');
  //   }
}

export const UniqueEmail = (validationOption: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propriety: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propriety,
      options: validationOption,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
