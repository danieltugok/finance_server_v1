import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const isUserCreated = await this.userRepository.findByEmail(
      createUserDto.email,
    );
    if (isUserCreated) throw new NotFoundException('User already exists');
    return this.userRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    });
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
