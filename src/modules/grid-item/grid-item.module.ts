import { Module } from '@nestjs/common';
import { GridItemService } from './grid-item.service';
import { GridItemController } from './grid-item.controller';

@Module({
  controllers: [GridItemController],
  providers: [GridItemService],
})
export class GridItemModule {}
