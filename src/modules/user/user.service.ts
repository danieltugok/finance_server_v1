import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { hash } from 'bcrypt';
import { QueryUserDto } from './dto/query-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserPaginationEntity } from './entities/user.pagination.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    // const isUserCreated = await this.userRepository.findByEmail(
    //   createUserDto.email,
    // );
    // if (isUserCreated) throw new NotFoundException('User already exists');
    const user = this.userRepository.create({
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    });
    if (user) return { message: 'User created successfully' };
  }

  async findAll(query: QueryUserDto): Promise<UserEntity | UserPaginationEntity[]> {
    if (query.paginator) return await this.userRepository.findAllPaginator(query);
    return await this.userRepository.findAll(query);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.preference['dashboard'] = user.dashboard.find((item) => item.id === user.preference.dashboard_default_id);
    delete user.dashboard;
    delete user.preference.dashboard_default_id;
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    return await this.userRepository.update(id, {
      ...updateUserDto,
      password: updateUserDto.password ? await hash(updateUserDto.password, 10) : undefined,
    });
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }

  async active(id: string) {
    return await this.userRepository.active(id);
  }
}
