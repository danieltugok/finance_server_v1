import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.$transaction(async (tx: any) => {
        const user = await tx.user.create({
          data: {
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
          },
        });

        const dashboard = await tx.dashboard.create({
          data: { name: 'Default', user_id: user.id },
        });

        await tx.preference.create({
          data: { user_id: user.id, dashboard_default_id: dashboard.id },
        });

        delete user.password;
        return user;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        preference: {
          select: {
            dashboard_default_id: true,
            language: true,
            isDark: true,
          },
        },
        dashboard: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        activetedAt: true,
        preference: {
          select: {
            dashboard_default_id: true,
            language: true,
            isDark: true,
          },
        },
        dashboard: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name || undefined,
        email: updateUserDto.email || undefined,
        password: updateUserDto.password || undefined,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date().toISOString() },
    });
  }

  async active(id: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { activetedAt: new Date().toISOString() },
    });
  }
}
