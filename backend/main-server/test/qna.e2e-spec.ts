import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { CanActivate, ExecutionContext, INestApplication } from '@nestjs/common';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Qna } from '../src/qna/entity/qna.entity';
import { SelfIntroduction } from '../src/selfIntroduction/entity/selfIntroduction.entity';
import { User } from '../src/user/entity/user.entity';
import { UserInfo } from '../src/user/entity/userInfo.entity';

const kakaoId = "1234";
const user = {
    relations: ["userInfos", "selfIntroductions", "selfIntroductions.qnas"],
    where: {
        kakaoId
    }
};

describe('QnaController (e2e)', () => {
  let app: INestApplication;

  const mockQnaRepository = {
    findOne: jest.fn((params) => {
      return (
        Promise.resolve({
          ...params
        })
      )
    }),
    find: jest.fn((params) => {
      return (
        Promise.resolve({
          ...params
        })
      )
    }),
    insert: jest.fn((params) => {
      return (
        Promise.resolve({
          ...params
        })
      )
    }),
    update: jest.fn((params1, params2) => {
      return (
        Promise.resolve({
          ...params1,
          ...params2
        })
      )
    }),
    delete: jest.fn((params) => {
      return (
        Promise.resolve({
          ...params
        })
      )
    })
  };
  const mockUserRepository = {
    findOne: jest.fn((params) => {
      return (
        Promise.resolve({
          ...params
        })
      )
    }),
  };
  const mockUserInfoRepository = {};
  const mockSelfIntroductionRepository = {
    findOne: jest.fn((params) => {
      return (
        Promise.resolve({
          ...params
        })
      )
    }),
  };
  const mockJwtStrategy = {};
  const mockJwt: CanActivate = {
    canActivate: jest.fn((context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = { kakaoId: kakaoId };
      return true;
    })
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Qna))
      .useValue(mockQnaRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .overrideProvider(getRepositoryToken(SelfIntroduction))
      .useValue(mockSelfIntroductionRepository)
      .overrideProvider(getRepositoryToken(UserInfo))
      .useValue(mockUserInfoRepository)
      .overrideProvider(JwtStrategy)
      .useValue(mockJwtStrategy)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwt)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/qna/1?selfIntroductionId=2 (GET)', () => {
    return request(app.getHttpServer())
      .get('/qna/1?selfIntroductionId=2')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          where: {
            id: "1",
            selfIntroduction: {
              where: {
                id: "2",
                user
              }
            }
          }
        })
      });
  });

  it('/qnas?selfIntroductionId=2 (GET)', () => {
    return request(app.getHttpServer())
      .get('/qnas?selfIntroductionId=2')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          where: {
            selfIntroduction: {
              where: {
                id: "2",
                user
              }
            }
          }
        })
      });
  });

  it('/qna (POST)', () => {
    const createQnaRequestDto = {
      selfIntroductionId: 1,
      question: 'Motivation?',
      answer: 'Self Esteem',
      maxCount: 500
    };

    return request(app.getHttpServer())
      .post('/qna')
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          selfIntroduction: {
            where: {
              user
            }
          }
        })
      });
  });

  it('/qna (PATCH)', () => {
    const updateQnaRequestDto = {
      id: 3,
      selfIntroductionId: 1,
      question: "Cooperation?",
      answer: "Project",
      maxCount: 1000
    };

    return request(app.getHttpServer())
      .patch('/qna')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          selfIntroduction: {
            where: {
              user
            }
          }
        })
      });
  });

  it('/qna/1?selfIntroductionId=2 (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/qna/1?selfIntroductionId=2')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: "1",
          selfIntroduction: {
            where: {
              id: "2",
              user
            }
          }
        })
      });
  });
});
