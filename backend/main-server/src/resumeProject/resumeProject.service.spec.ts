import { Test, TestingModule } from '@nestjs/testing';
import { ResumeProjectService } from './resumeProject.service';

describe('ResumeProjectService', () => {
  let service: ResumeProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResumeProjectService],
    }).compile();

    service = module.get<ResumeProjectService>(ResumeProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
