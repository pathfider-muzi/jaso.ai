import { Test, TestingModule } from '@nestjs/testing';
import { SelfIntroductionController } from './selfIntroduction.controller';

describe('SelfIntroductionController', () => {
  let controller: SelfIntroductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfIntroductionController],
    }).compile();

    controller = module.get<SelfIntroductionController>(SelfIntroductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
