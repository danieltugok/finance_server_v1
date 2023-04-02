import { Test, TestingModule } from '@nestjs/testing';
import { GridItemService } from './grid-item.service';

describe('GridItemService', () => {
  let service: GridItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GridItemService],
    }).compile();

    service = module.get<GridItemService>(GridItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
