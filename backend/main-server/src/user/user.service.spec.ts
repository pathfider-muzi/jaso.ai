import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserInfo } from './entity/userInfo.entity';
import { UserService } from './user.service';

const kakaoId = 101;
const nickname = 'Tom';
const profile_image_url = "google.com";

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    findOne: jest.fn((params) => {
     return (
       Promise.resolve({
         id: Date.now(),
         params
       })
     ) 
    }),
    insert: jest.fn((params) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params
        })
      )
    }),
    update: jest.fn((params1, params2) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params1,
          params2
        })
      )
    }),
    delete: jest.fn((params) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params
        })
      )
    })
  };

  const mockUserInfoRepository = {
    insert: jest.fn((params) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params
        })
      )
    }),
    update: jest.fn((params1, params2) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params1,
          params2
        })
      )
    }),
    delete: jest.fn((params) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params
        })
      )
    }),
    findOne: jest.fn((params) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params
        })
      )
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getRepositoryToken(User),
        useValue: mockUserRepository
      }, {
        provide: getRepositoryToken(UserInfo),
        useValue: mockUserInfoRepository
      }],
    })
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a user', async () => {
    expect(await service.getUser(kakaoId))
      .toEqual({
        id: expect.any(Number),
        params: {
          relations: [
            "userInfos", "selfIntroductions", "selfIntroductions.qnas"
          ],
          where: {
            kakaoId
          }
        }
      });

    expect(mockUserRepository.findOne).toHaveBeenCalled();
  });

  it('should create a user', async () => {
    expect(await service.createUser(kakaoId, nickname, profile_image_url))
      .toEqual({
        id: expect.any(Number),
        params: {
          kakaoId,
          nickname,
          profileImage: profile_image_url,
          agreeToTerms: false
        }
      });

    expect(mockUserRepository.insert).toHaveBeenCalled();
  });

  it('should update a user', async () => {
    expect(await service.updateUser(kakaoId, nickname, profile_image_url))
      .toEqual({
        id: expect.any(Number),
        params1: {
          kakaoId
        },
        params2: {
          kakaoId,
          nickname,
          profileImage: profile_image_url,
          agreeToTerms: false
        }
      });
    
    expect(mockUserRepository.update).toHaveBeenCalled();
  });

  it('should delete a user', async () => {
    expect(await service.deleteUser(kakaoId))
      .toEqual({
        id: expect.any(Number),
        params: {
          kakaoId
        }
      });

    expect(mockUserRepository.delete).toHaveBeenCalled();
  });

  it('should get a userInfo', async () => {
    const user = {
      id: 1,
      kakaoId,
      nickname,
      profileImage: profile_image_url,
      agreeToTerms: true,
      userInfos: [],
      selfIntroductions: []
    };

    expect(await service.getUserInfo(user))
      .toEqual({
        id: expect.any(Number),
        params: {
          where: {
            user
          }
        }
      });

    expect(mockUserInfoRepository.findOne).toHaveBeenCalled();
  });

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
    };
    const user = {
      id: 2,
      kakaoId,
      nickname,
      profileImage: profile_image_url,
      agreeToTerms: false,
      userInfos: [],
      selfIntroductions: []
    };

    expect(await service.updateUserInfo(updateUserInfoRequestDto, user))
      .toEqual({
        id: expect.any(Number),
        params1: {
          user
        }, 
        params2: updateUserInfoRequestDto
      });
    
    expect(mockUserInfoRepository.update).toHaveBeenCalled();
  });

  it('should delete a userInfo', async () => {
    const user = {
      id: 3,
      kakaoId,
      nickname,
      profileImage: profile_image_url,
      agreeToTerms: false,
      userInfos: [],
      selfIntroductions: []
    };

    expect(await service.deleteUserInfo(user))
      .toEqual({
        id: expect.any(Number),
        params: {
          user
        }
      });
    
    expect(mockUserInfoRepository.delete).toHaveBeenCalled();
  });

  it('should agree to terms', async () => {
    const agreeToTermsRequestDto = {
      agreeToTerms: true
    };

    expect(await service.agreeToTerms(agreeToTermsRequestDto, kakaoId))
      .toEqual({
        id: expect.any(Number),
        params1: {
          kakaoId
        },
        params2: {
          ...agreeToTermsRequestDto
        }
      })
    
    expect(mockUserInfoRepository.update).toHaveBeenCalled();
  })
});
