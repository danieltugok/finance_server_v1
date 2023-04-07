import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetController } from './widget.controller';
import { PrismaService } from 'src/prisma.service';
import { WidgetRepository } from './widget.repository';

@Module({
  controllers: [WidgetController],
  providers: [WidgetService, PrismaService, WidgetRepository],
})
export class WidgetModule {}
