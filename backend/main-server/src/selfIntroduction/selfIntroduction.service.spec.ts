import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SelfIntroduction } from './entity/selfIntroduction.entity';
import { SelfIntroductionService } from './selfIntroduction.service';

const user = {
  id: 1,
  kakaoId: 101,
  nickname: 'Emma',
  profileImage: 'naver.com',
  agreeToTerms: false,
  selfIntroductions: [],
  userInfos: []
};

const id = 3;

describe('SelfIntroductionService', () => {
  let service: SelfIntroductionService;

  const mockSelfIntroductionRepository = {
    findOne: jest.fn((params) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params
        })
      )
    }),
    find: jest.fn((params) => {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfIntroductionService, {
        provide: getRepositoryToken(SelfIntroduction),
        useValue: mockSelfIntroductionRepository
      }],
    }).compile();

    service = module.get<SelfIntroductionService>(SelfIntroductionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a self introduction', async () => {
    const id = 1;

    expect(await service.getSelfIntroduction(id, user))
      .toEqual({
        id: expect.any(Number),
        params: {
          where: {
            id,
            user
          }
        }
      });
    
    expect(mockSelfIntroductionRepository.findOne).toHaveBeenCalled();
  });

  it('should get self introductions', async () => {
    expect(await service.getSelfIntroductions(user))
      .toEqual({
        id: expect.any(Number),
        params: {
          where: {
            user
          }
        }
      });

    expect(mockSelfIntroductionRepository.find).toHaveBeenCalled();
  });

  it('should create a self introduction', async () => {
    const createSelfIntroductionRequestDto = {
      title: 'Samsung Jaso',
      organisationName: 'Samsung Electronics',
      role: "CE"
    };

    expect(await service.createSelfIntroduction(createSelfIntroductionRequestDto, user))
      .toEqual({
        id: expect.any(Number),
        params: {
          ...createSelfIntroductionRequestDto,
          user
        }
      });

    expect(mockSelfIntroductionRepository.insert).toHaveBeenCalled();
  });

  it('should update a self introduction', async () => {
    const updateSelfIntroductionRequestDto = {
      id: 2,
      title: 'Kakao Jaso',
      organisationName: "Kakao",
      role: "Infra Developer"
    };

    expect(await service.updateSelfIntroduction(updateSelfIntroductionRequestDto, user))
      .toEqual({
        id: expect.any(Number),
        params1: {
          id: updateSelfIntroductionRequestDto.id,
          user
        },
        params2: {
          title: updateSelfIntroductionRequestDto.title,
          organisationName: updateSelfIntroductionRequestDto.organisationName,
          role: updateSelfIntroductionRequestDto.role
        }
      });
    
      expect(mockSelfIntroductionRepository.update).toHaveBeenCalled();
  });

  it('should delete a self introduction', async () => {
    const deleteSelfIntroductionRequestDto = {
      id: 3
    };

    expect(await service.deleteSelfIntroduction(id, user))
      .toEqual({
        id: expect.any(Number),
        params: {
          id,
          user
        }
      });
    
    expect(mockSelfIntroductionRepository.delete).toHaveBeenCalled();
  });
});
