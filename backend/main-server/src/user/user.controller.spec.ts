import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const reqJwtInfo = {
  'user': {
    'kakaoId': 101
  }
}

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    getUser: jest.fn((kakaoId) => {
      return {
        id: kakaoId,
        userInfos: []
      }
    }),
    getUserInfo: jest.fn(() => {
      return {
        major: 'economics',
        grade: null,
        career: "",
        activity: ""
      }
    }),
    deleteUser: jest.fn((kakaoId) => {
      return {
        id: kakaoId
      }
    }),
    createUserInfo: jest.fn(createUserInfoRequestDto => {
      return {
        id: Date.now(),
        ...createUserInfoRequestDto
      }
    }),
    updateUserInfo: jest.fn(updateUserInfoRequestDto => {
      return {
        id: Date.now(),
        ...updateUserInfoRequestDto
      }
    }),
    agreeToTerms: jest.fn(agreeToTermsRequestDto => {
      return {
        id: Date.now(),
        ...agreeToTermsRequestDto
      }
    })
  };
  const mockJwt: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
      ]
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwt)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a user', async () => {
    expect(await controller.getUser(reqJwtInfo))
      .toEqual({
        id: reqJwtInfo.user.kakaoId,
        userInfos: []
      })

    expect(mockUserService.getUser).toHaveBeenCalled();
  })

  it('should delete a user', async () => {
    expect(await controller.deleteUser(reqJwtInfo))
      .toEqual({
        id: reqJwtInfo.user.kakaoId
      })

    expect(mockUserService.deleteUser).toHaveBeenCalled();
  })

  it('shoould get a userInfo', async () => {
    expect(await controller.checkRequiredFields(
      reqJwtInfo
    )).toEqual({
      hasFilledInRequiredFields: false
    })

    expect(mockUserService.getUserInfo).toHaveBeenCalled();
  })

  it('should update a userInfo', async () => {
    const updateUserInfoRequestDto = {
      name: 'Lee',
      email: 'leebyungheon@gmail.com',
      university: 'KNUA',
      major: 'acting',
      grade: '3.0',
      languageScore: 'A2',
      career: 'Chungmuro',
      activity: 'Naebujadeul',
      license: 'yeonghwaui geori'
    }

    expect(await controller.updateUserInfo(
      updateUserInfoRequestDto, reqJwtInfo
    )).toEqual({
      id: expect.any(Number),
      ...updateUserInfoRequestDto
    })

    expect(mockUserService.updateUserInfo).toHaveBeenCalled();
  })

  it('should agree to terms', async () => {
    const agreeToTermsRequestDto = {
      agreeToTerms: true
    }

    expect(await controller.agreeToTerms(
      agreeToTermsRequestDto, reqJwtInfo
    )).toEqual({
      id: expect.any(Number),
      ...agreeToTermsRequestDto
    })

    expect(mockUserService.agreeToTerms).toHaveBeenCalled();
  })
});