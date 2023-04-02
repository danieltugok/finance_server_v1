import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}
  create(createDashboardDto: CreateDashboardDto) {
    return this.dashboardRepository.create(createDashboardDto);
  }

  findByUser(id: string) {
    return this.dashboardRepository.findByUser(id);
  }

  update(id: string, updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardRepository.update(id, updateDashboardDto);
  }

  updateDashboardDefault(user_id: string, dashboard_id: string) {
    return this.dashboardRepository.updateDashboardDefault(
      user_id,
      dashboard_id,
    );
  }

  remove(id: string) {
    return this.dashboardRepository.remove(id);
  }
}
