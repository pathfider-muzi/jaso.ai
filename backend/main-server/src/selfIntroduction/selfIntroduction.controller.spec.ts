import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SelfIntroductionService } from './selfIntroduction.service';
import { UserService } from '../user/user.service';
import { SelfIntroductionController } from './selfIntroduction.controller';

const reqJwtInfo = {
  'user': {
    'kakaoId': 101
  }
};
const id = 1;

describe('SelfIntroductionController', () => {
  let controller: SelfIntroductionController;

  const mockSelfIntroductionService = {
    getSelfIntroduction: jest.fn((id, user) => {
      return {
        id,
        ...user
      }
    }),
    getSelfIntroductions: jest.fn((user) => {
      return {
        id: Date.now(),
        selfIntroductions: []
      }
    }),
    updateSelfIntroduction: jest.fn((updateSelfIntroductionRequestDto, user) => {
      return {
        ...updateSelfIntroductionRequestDto,
        user
      }
    }),
    deleteSelfIntroduction: jest.fn((id, user) => {
      return {
        id,
        user
      }
    })
  };
  const mockUserService = {
    getUser: jest.fn((kakaoId) => {
      return {
        id: kakaoId,
        selfIntroductions: []
      }
    })
  };
  const mockJwt: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfIntroductionController],
      providers: [
        SelfIntroductionService,
        UserService
      ]
    })
      .overrideProvider(SelfIntroductionService)
      .useValue(mockSelfIntroductionService)
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwt)
      .compile();

    controller = module.get<SelfIntroductionController>(SelfIntroductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a self introduction', async () => {
    expect(await controller.getSelfIntroduction(reqJwtInfo, id))
      .toEqual({
        id: expect.any(Number),
        selfIntroductions: []
      });
    
    expect(mockSelfIntroductionService.getSelfIntroduction).toHaveBeenCalled();
  });

  it('should get self introductions', async () => {
    expect(await controller.getSelfIntroductions(reqJwtInfo))
      .toEqual({
        id: expect.any(Number),
        selfIntroductions: []
      });
    
    expect(mockSelfIntroductionService.getSelfIntroductions).toHaveBeenCalled();
  });

  it('should update self introduction', async () => {
    const updateSelfIntroductionRequestDto = {
      id: 2,
      title: 'Samsung Jaso',
      organisationName: 'Samsung',
      role: 'CE'
    };

    expect(await controller.updateSelfIntroduction(updateSelfIntroductionRequestDto, reqJwtInfo))
      .toEqual({
        ...updateSelfIntroductionRequestDto,
        user: {
          id: 101,
          selfIntroductions: []
        }
      });

    expect(mockSelfIntroductionService.updateSelfIntroduction).toHaveBeenCalled();
  });

  it('should delete self introduction', async () => {
    const deleteSelfIntroductionRequestDto = {
      id: 3
    };

    expect(await controller.deleteSelfIntroduction(id, reqJwtInfo))
    .toEqual({
      id,
      user: {
        id: 101,
        selfIntroductions: []
      }
    });

    expect(mockSelfIntroductionService.deleteSelfIntroduction).toHaveBeenCalled();
  });
});
