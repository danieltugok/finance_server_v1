import { Test, TestingModule } from '@nestjs/testing';
import { GridItemController } from './grid-item.controller';
import { GridItemService } from './grid-item.service';

describe('GridItemController', () => {
  let controller: GridItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GridItemController],
      providers: [GridItemService],
    }).compile();

    controller = module.get<GridItemController>(GridItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
