import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Qna } from './entity/qna.entity';
import { QnaService } from './qna.service';

const user = {
  id: 1,
  kakaoId: 101,
  nickname: 'Emma',
  profileImage: 'naver.com',
  agreeToTerms: false,
  selfIntroductions: [],
  userInfos: []
};

const selfIntroduction = {
  id: 5,
  createdDate: new Date(),
  updatedDate: new Date(),
  title: 'Naver Jaso',
  organisationName: 'Naver',
  role: 'Backend Developer',
  qnas: [],
  user
};

describe('QnaService', () => {
  let service: QnaService;

  const mockQnaRepository = {
    findOne: jest.fn((params) => {
      return (
        Promise.resolve({
          params
        })
      )
    }),
    find: jest.fn((params) => {
      return (
        Promise.resolve({
          params
        })
      )
    }),
    insert: jest.fn((params) => {
      return (
        Promise.resolve({
          params
        })
      )
    }),
    update: jest.fn((params1, params2) => {
      return (
        Promise.resolve({
          params1,
          params2
        })
      )
    }),
    delete: jest.fn((params) => {
      return (
        Promise.resolve({
          params
        })
      )
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QnaService, {
        provide: getRepositoryToken(Qna),
        useValue: mockQnaRepository
      }],
    }).compile();

    service = module.get<QnaService>(QnaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a qna', async () => {
    const id = 6;

    expect(await service.getQna(id, selfIntroduction, user))
      .toEqual({
        params: {
          where: {
            id,
            selfIntroduction
          }
        }
      });
    
    expect(mockQnaRepository.findOne).toHaveBeenCalled();
  });

  it('should get qnas', async () => {
    expect(await service.getQnas(selfIntroduction, user))
      .toEqual({
        params: {
          where: {
            selfIntroduction
          }
        }
      });
    
    expect(mockQnaRepository.find).toHaveBeenCalled();
  });

  it('should create a qna', async () => {
    const question = "Overcome?";
    const answer = "Volunteer";
    const maxCount = 700;

    expect(await service.createQna(question, answer, maxCount, selfIntroduction))
      .toEqual({
        params: {
          question,
          answer,
          maxCount,
          selfIntroduction
        }
      });

    expect(mockQnaRepository.insert).toHaveBeenCalled();
  });

  it('should update a qna', async () => {
    const id = 7;
    const question = "Public Interest?";
    const answer = "Social Service";
    const maxCount = 800;

    expect(await service.updateQna(id, question,  answer, maxCount, selfIntroduction))
      .toEqual({
        params1: {
          id,
          selfIntroduction
        },
        params2: {
          question,
          answer,
          maxCount
        }
      });
    
    expect(mockQnaRepository.update).toHaveBeenCalled();
  });

  it('should delete a qna', async () => {
    const id = 8;

    expect(await service.deleteQna(id, selfIntroduction))
      .toEqual({
        params: {
          id,
          selfIntroduction
        }
      });

    expect(mockQnaRepository.delete).toHaveBeenCalled();
  });
});
