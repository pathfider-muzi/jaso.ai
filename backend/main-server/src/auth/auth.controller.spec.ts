import { HttpService } from '@nestjs/axios';
import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;

  const mockUserService = {

  };
  const mockHttpService = {
    
  };
  const mockAuthService = {

  };
  const mockJwt: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        HttpService,
        UserService,
        AuthService
      ]
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwt)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('shoud get access token', async () => {

  });
});
