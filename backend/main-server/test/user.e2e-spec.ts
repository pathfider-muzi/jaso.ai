import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CanActivate, ExecutionContext, INestApplication } from '@nestjs/common';
import { UserModule } from '../src/user/user.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/entity/user.entity';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { JwtStrategy } from '../src/auth/jwt.strategy';
import { UserInfo } from '../src/user/entity/userInfo.entity';

const kakaoId = "1234";

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const mockUserRepository = {
    findOne: jest.fn((params) => {
      return (
        Promise.resolve({
          params
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
    update: jest.fn((params1, params2) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params1,
          params2
        })
      )
    }),
  };
  const mockUserInfoRepository = {
    update: jest.fn((params1, params2) => {
      return (
        Promise.resolve({
          id: Date.now(),
          params2
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
      imports: [UserModule],
    })
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

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect({
        params: {
          relations: [
            "userInfos", "selfIntroductions", "selfIntroductions.qnas"
          ],
          where: {
            kakaoId
          }
        }
      });
  });

  it('/user (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/user')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          params: {
            kakaoId
          }
        })
      });
  });

  it('/user-info (PATCH)', () => {
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

    return request(app.getHttpServer())
      .patch('/user/user-info')
      .send(updateUserInfoRequestDto)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          params2: updateUserInfoRequestDto
        })
      });
  });

  it('/user/terms (POST)', () => {
    const agreeToTermsRequestDto = {
      agreeToTerms: true
    };

    const user = {
      kakaoId: kakaoId
    }

    return request(app.getHttpServer())
      .post('/user/terms')
      .send(agreeToTermsRequestDto)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          params1: user,
          params2: agreeToTermsRequestDto
        })
      });
  });

  it('user/user-info/requirements', () => {
    return request(app.getHttpServer())
      .get('/user/user-info/requirements')
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          hasFilledInRequiredFields: true
        })
      });
  });
});
