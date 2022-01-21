import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserModule } from '../user/user.module';
import { SelfIntroduction } from './entity/selfIntroduction.entity';
import { SelfIntroductionController } from './selfIntroduction.controller';
import { SelfIntroductionService } from './selfIntroduction.service';

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
    ],
    exports: [
        TypeOrmModule,
        SelfIntroductionService
    ]
})
export class SelfIntroductionModule {}
