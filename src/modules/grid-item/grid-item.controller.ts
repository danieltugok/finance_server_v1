import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { GridItemService } from './grid-item.service';
import { CreateGridItemDto } from './dto/create-grid-item.dto';
import { UpdateGridItemDto } from './dto/update-grid-item.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/grid-item')
export class GridItemController {
  constructor(private readonly gridItemService: GridItemService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createGridItemDto: CreateGridItemDto) {
    return this.gridItemService.create(createGridItemDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGridItemDto: UpdateGridItemDto) {
    return this.gridItemService.update(+id, updateGridItemDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gridItemService.remove(+id);
  }
}
