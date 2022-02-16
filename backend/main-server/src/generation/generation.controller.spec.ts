import { Test, TestingModule } from '@nestjs/testing';
import { GenerationController } from './generation.controller';

describe('GenerationController', () => {
  let controller: GenerationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerationController],
    }).compile();

    controller = module.get<GenerationController>(GenerationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
