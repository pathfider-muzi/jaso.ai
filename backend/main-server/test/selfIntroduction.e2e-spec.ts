import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CanActivate, ExecutionContext, INestApplication } from '@nestjs/common';
import { SelfIntroductionModule } from '../src/selfIntroduction/selfIntroduction.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SelfIntroduction } from '../src/selfIntroduction/entity/selfIntroduction.entity';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { User } from '../src/user/entity/user.entity';
import { UserInfo } from '../src/user/entity/userInfo.entity';
import { response } from 'express';

const kakaoId = "1234";
const user = {
    relations: ["userInfos", "selfIntroductions", "selfIntroductions.qnas"],
    where: {
        kakaoId
    }
};

describe('SelfIntroductionController (e2e)', () => {
  let app: INestApplication;

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
  const mockSelfIntroduction = {
    find: jest.fn((params) => {
        return (
          Promise.resolve({
            id: Date.now(),
            ...params
          })
        )
    }),
    findOne: jest.fn((params) => {
        return (
          Promise.resolve({
            ...params
          })
        )
    }),
    insert: jest.fn((params) => {
        return (
          Promise.resolve({
            id: Date.now(),
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
      imports: [SelfIntroductionModule],
    })
        .overrideProvider(getRepositoryToken(SelfIntroduction))
        .useValue(mockSelfIntroduction)
        .overrideProvider(getRepositoryToken(User))
        .useValue(mockUserRepository)
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

  it('/self-introduction (GET)', () => {
      return request(app.getHttpServer())
        .get('/self-introduction/1')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({
                where: {
                    id: "1",
                    user
                }
            })
        });
  });

  it('/self-introductions (GET)', () => {
    return request(app.getHttpServer())
      .get('/self-introductions')
      .expect(200)
      .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(Number),
            where: {
                user
            }
          })
      });
  });

  it('/self-introduction (POST)', () => {
    const createSelfIntroductionRequestDto = {
        title: 'Samsung Jaso',
        organisationName: 'Samsung Electronics',
        role: "CE"
      };  

    return request(app.getHttpServer())
      .post('/self-introduction')
      .expect(201)
      .then((response) => {
          expect(response.body).toEqual({
            id: expect.any(Number),
            user
          })
      });
  });

  it('/self-introduction (PATCH)', () => {
    const updateSelfIntroductionRequestDto = {
        id: 2,
        title: 'Kakao Jaso',
        organisationName: "Kakao",
        role: "Infra Developer"
    };

    return request(app.getHttpServer())
      .patch('/self-introduction')
      .expect(200)
      .then((response) => {
          expect(response.body).toEqual({
            user
          })
      });
  });

  it('/self-introduction (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/self-introduction/1')
      .expect(200)
      .then((response) => {
          expect(response.body).toEqual({
            id: "1",
            user
          })
      });
  });
});
