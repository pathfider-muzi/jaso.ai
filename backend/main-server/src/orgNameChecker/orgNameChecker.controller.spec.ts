import { Test, TestingModule } from '@nestjs/testing';
import { OrgNameCheckerController } from './orgNameChecker.controller';

describe('OrgNameCheckerController', () => {
  let controller: OrgNameCheckerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgNameCheckerController],
    }).compile();

    controller = module.get<OrgNameCheckerController>(OrgNameCheckerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
