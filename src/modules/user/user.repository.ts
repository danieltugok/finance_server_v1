import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
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

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { id, deletedAt: null },
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
            row: true,
            column: true,
            margin: true,
            grid_items: true,
          },
        },
      },
    });
  }

  async findAll(query: QueryUserDto): Promise<any> {
    const where: any = {
      deletedAt: query.deleted ? { not: null } : null,
      AND: [{ name: { contains: query.name || '', mode: 'insensitive' } }],
    };
    return await this.prisma.user.findMany({
      where,
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

  async findAllPaginator(query: QueryUserDto): Promise<any> {
    console.log("🚀 ~ file: user.repository.ts:105 ~ UserRepository ~ findAllPaginator ~ query:", query, {email: { contains: query.search || '', mode: 'insensitive' }} )
    const page = query.page || 1;
    const take = +query.limit || 10;
    const skip = (+page - 1) * +take;
    const orderBy = { [query.order || 'updatedAt']: query.sort || 'desc' };

    const where: any = {
      deletedAt: query.deleted ? { not: null } : null,
      createdAt: query.start_date && query.end_date ? { gte: query.start_date, lte: query.end_date } : undefined,
      OR: [
        { name: { contains: query.search || '', mode: 'insensitive' } },
        { email: { contains: query.search || '', mode: 'insensitive' } }
      ],
    };

    const [records, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
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
        skip,
        take,
        orderBy,
      }),
      this.prisma.user.count({ where }),
    ]);
    return { records, total, pages: Math.ceil(total / +take) };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
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

  async remove(id: string): Promise<any> {
    return await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date().toISOString() },
    });
  }

  async active(id: string): Promise<any> {
    return await this.prisma.user.update({
      where: { id },
      data: { activetedAt: new Date().toISOString() },
    });
  }
}
