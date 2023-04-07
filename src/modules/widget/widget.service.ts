import { Injectable } from '@nestjs/common';
import { WidgetRepository } from './widget.repository';

@Injectable()
export class WidgetService {
  constructor(private readonly widgetsRepository: WidgetRepository) {}

  findAll() {
    return this.widgetsRepository.findAll();
  }
}
