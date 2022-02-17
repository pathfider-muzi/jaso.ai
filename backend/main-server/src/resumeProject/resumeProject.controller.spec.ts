import { Test, TestingModule } from '@nestjs/testing';
import { ResumeProjectController } from './resumeProject.controller';

describe('ResumeProjectController', () => {
  let controller: ResumeProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeProjectController],
    }).compile();

    controller = module.get<ResumeProjectController>(ResumeProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
