import { Test, TestingModule } from '@nestjs/testing';
import { SubForumService } from './sub-forum.service';

describe('SubForumService', () => {
  let service: SubForumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubForumService],
    }).compile();

    service = module.get<SubForumService>(SubForumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
