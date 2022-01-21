import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SelfIntroductionService } from '../selfIntroduction/selfIntroduction.service';
import { UserService } from '../user/user.service';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';

const reqJwtInfo = {
  'user': {
    'kakaoId': 101
  }
};

const user = {
  id: 101,
  selfIntroductions: []
}

const selfIntroduction = {
  id: 1,
  qnas: []
};

describe('QnaController', () => {
  let controller: QnaController;

  const mockQnaService = {
    getQna: jest.fn((id, selfIntroduction, user) => {
      return {
        id,
        selfIntroduction,
        user
      }
    }),
    getQnas: jest.fn((selfIntroduction, user) => {
      return {
        where: {
          selfIntroduction,
          user
        }
      }
    }),
    createQna: jest.fn((question, answer, maxCount, selfIntroduction) => {
      return {
        question,
        answer,
        maxCount,
        selfIntroduction
      }
    }),
    updateQna: jest.fn((id, question, answer, maxCount, selfIntroduction) => {
      return {
        id,
        question,
        answer,
        maxCount,
        selfIntroduction
      }
    }),
    deleteQna: jest.fn((id, selfIntroduction) => {
      return {
        id,
        selfIntroduction
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
  const mockSelfIntroductionService = {
    getSelfIntroduction: jest.fn((selfIntroductionId, user) => {
      return {
        id: selfIntroductionId,
        qnas: []
      }
    })
  };
  const mockJwt: CanActivate = { canActivate: jest.fn(() => true) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QnaController],
      providers: [
        QnaService,
        UserService,
        SelfIntroductionService
      ]
    })
      .overrideProvider(QnaService)
      .useValue(mockQnaService)
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .overrideProvider(SelfIntroductionService)
      .useValue(mockSelfIntroductionService)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwt)
      .compile();

    controller = module.get<QnaController>(QnaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a qna', async () => {
    const getQnaRequestDto = {
      selfIntroductionId: 1,
      id: 2
    };

    expect(await controller.getQna(getQnaRequestDto, reqJwtInfo))
      .toEqual({
        id: getQnaRequestDto.id,
        selfIntroduction,
        user
      });
    
    expect(mockQnaService.getQna).toHaveBeenCalled();
  });

  it('should get qnas', async () => {
    const getQnasRequestDto = {
      selfIntroductionId: 1,
    };

    expect(await controller.getQnas(getQnasRequestDto, reqJwtInfo))
      .toEqual({
        where: {
          selfIntroduction,
          user
        }
      });

    expect(mockQnaService.getQnas).toHaveBeenCalled();
  });

  it('should create a qna', async () => {
    const createQnaRequestDto = {
      selfIntroductionId: 1,
      question: 'Motivation?',
      answer: 'Self Esteem',
      maxCount: 500
    };

    expect(await controller.createQna(createQnaRequestDto, reqJwtInfo))
      .toEqual({
        question: createQnaRequestDto.question,
        answer: createQnaRequestDto.answer,
        maxCount: createQnaRequestDto.maxCount,
        selfIntroduction
      });
    
    expect(mockQnaService.createQna).toHaveBeenCalled();
  });

  it('should update a qna', async () => {
    const updateQnaRequestDto = {
      id: 3,
      selfIntroductionId: 1,
      question: "Cooperation?",
      answer: "Project",
      maxCount: 1000
    };

    expect(await controller.updateQna(updateQnaRequestDto, reqJwtInfo))
      .toEqual({
        id: updateQnaRequestDto.id,
        question: updateQnaRequestDto.question,
        answer: updateQnaRequestDto.answer,
        maxCount: updateQnaRequestDto.maxCount,
        selfIntroduction
      });
    
    expect(mockQnaService.updateQna).toHaveBeenCalled();
  });

  it('should delete a qna', async () => {
    const deleteQnaRequestDto = {
      selfIntroductionId: 1,
      id: 4
    };

    expect(await controller.deleteQna(deleteQnaRequestDto, reqJwtInfo))
      .toEqual({
        id: deleteQnaRequestDto.id,
        selfIntroduction
      });
    
    expect(mockQnaService.deleteQna).toHaveBeenCalled();
  });
});
