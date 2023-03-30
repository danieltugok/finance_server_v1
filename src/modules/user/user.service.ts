import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
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

  findByEmail(email: string): Promise<any> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<any> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.preference['dashboard'] = user.dashboard.find(
      (item) => item.id === user.preference.dashboard_default_id,
    );
    delete user.dashboard;
    delete user.preference.dashboard_default_id;
    return user;
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
