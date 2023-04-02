import { Injectable } from '@nestjs/common';
import { CreateGridItemDto } from './dto/create-grid-item.dto';
import { UpdateGridItemDto } from './dto/update-grid-item.dto';

@Injectable()
export class GridItemService {
  create(createGridItemDto: CreateGridItemDto) {
    return 'This action adds a new gridItem';
  }

  findAll() {
    return `This action returns all gridItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gridItem`;
  }

  findByUser(id: string) {
    return `This action returns a #${id} gridItem`;
  }

  update(id: number, updateGridItemDto: UpdateGridItemDto) {
    return `This action updates a #${id} gridItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} gridItem`;
  }
}
