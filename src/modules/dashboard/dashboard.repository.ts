import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDashboardDto: CreateDashboardDto) {
    return await this.prisma.dashboard.create({
      data: createDashboardDto,
    });
  }

  async findByUser(user_id: string) {
    return await this.prisma.dashboard.findMany({
      where: { user_id },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.dashboard.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        row: true,
        column: true,
        margin: true,
        grid_items: true,
      },
    });
  }

  async updateDashboardDefault(user_id: string, dashboard_id: string): Promise<any> {
    return await this.prisma.preference.updateMany({
      where: { user_id },
      data: { dashboard_default_id: dashboard_id },
    });
  }

  async update(id: string, updateDashboardDto: UpdateDashboardDto): Promise<any> {
    return await this.prisma.dashboard.update({
      where: { id },
      data: updateDashboardDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.dashboard.delete({
      where: { id },
    });
  }

  // async active(id: string) {
  //   return await this.prisma.user.update({
  //     where: { id },
  //     data: { activetedAt: new Date().toISOString() },
  //   });
  // }
}
