import { Test, TestingModule } from '@nestjs/testing';
import { ArrayListService } from './array-list.service';

describe('ArrayListService', () => {
  let service: ArrayListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArrayListService],
    }).compile();

    service = module.get<ArrayListService>(ArrayListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
