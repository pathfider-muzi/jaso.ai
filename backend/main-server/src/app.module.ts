import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './user/user.module';
import { SelfIntroductionModule } from './selfIntroduction/selfIntroduction.module';
import { QnaModule } from './qna/qna.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { OrgNameCheckerModule } from './orgNameChecker/orgNameChecker.module';
import { ResumeModule } from './resume/resume.module';
import { GenerationModule } from './generation/generation.module';
import { ResumeProjectModule } from './resumeProject/resumeProject.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    UserModule,
    SelfIntroductionModule,
    QnaModule,
    RecommendationModule,
    OrgNameCheckerModule,
    ResumeModule,
    GenerationModule,
    ResumeProjectModule,
    FeedbackModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
