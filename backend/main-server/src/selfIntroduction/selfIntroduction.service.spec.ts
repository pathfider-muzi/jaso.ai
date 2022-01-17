import { Test, TestingModule } from '@nestjs/testing';
import { SelfIntroductionService } from './selfIntroduction.service';

describe('SelfIntroductionService', () => {
  let service: SelfIntroductionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfIntroductionService],
    }).compile();

    service = module.get<SelfIntroductionService>(SelfIntroductionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
