import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { SelfIntroduction } from './entity/selfIntroduction.entity';
import { SelfIntroductionController } from './self-introduction.controller';
import { SelfIntroductionService } from './self-introduction.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SelfIntroduction]),
        PassportModule,
        UserModule
    ],
    controllers: [SelfIntroductionController],
    providers: [
        SelfIntroductionService,
        JwtStrategy,
    ]
})
export class SelfIntroductionModule {}
