import { Test, TestingModule } from '@nestjs/testing';
import { LinkedListService } from './linked-list.service';

describe('LinkedListService', () => {
  let service: LinkedListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkedListService],
    }).compile();

    service = module.get<LinkedListService>(LinkedListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
