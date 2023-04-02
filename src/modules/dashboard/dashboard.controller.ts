import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('api/v1/dashboards')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req: any, @Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create({
      ...createDashboardDto,
      user_id: req.user.id,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Request() req: any) {
    return this.dashboardService.findByUser(req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(id, updateDashboardDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':dashboard_id/default')
  updateDashboardDefault(
    @Request() req: any,
    @Param('dashboard_id') dashboard_id: string,
  ) {
    return this.dashboardService.updateDashboardDefault(
      req.user.id,
      dashboard_id,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(id);
  }
}
