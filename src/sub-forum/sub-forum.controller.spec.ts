import { Test, TestingModule } from '@nestjs/testing';
import { SubForumController } from './sub-forum.controller';

describe('SubForumController', () => {
  let controller: SubForumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubForumController],
    }).compile();

    controller = module.get<SubForumController>(SubForumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
