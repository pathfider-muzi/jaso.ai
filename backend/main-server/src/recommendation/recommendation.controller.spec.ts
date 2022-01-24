import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { RecommendationController } from './recommendation.controller';

describe('RecommendationController', () => {
  let controller: RecommendationController;

  const mockHttpService = {};
  const mockUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommendationController],
      providers: [
        UserService,
        HttpService
      ]
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    controller = module.get<RecommendationController>(RecommendationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
