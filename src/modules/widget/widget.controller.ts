import { Controller, Get, UseGuards } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/widgets')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.widgetService.findAll();
  }
}
