import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { SelfIntroductionModule } from '../selfIntroduction/selfIntroduction.module';
import { UserModule } from '../user/user.module';
import { Qna } from './entity/qna.entity';
import { QnaController } from './qna.controller';
import { QnaService } from './qna.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qna]),
    PassportModule,
    UserModule,
    SelfIntroductionModule
  ],
  controllers: [QnaController],
  providers: [
    QnaService,
    JwtStrategy
  ]
})
export class QnaModule {}
