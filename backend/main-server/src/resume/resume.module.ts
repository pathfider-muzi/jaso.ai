import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { Resume } from './entity/resume.entity';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Resume]),
        PassportModule,
        UserModule
    ],
    controllers: [ResumeController],
    providers: [
        ResumeService,
        JwtStrategy
    ],
    exports: [
        TypeOrmModule,
        ResumeService
    ]
})
export class ResumeModule {}
