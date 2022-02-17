import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ResumeModule } from '../resume/resume.module';
import { UserModule } from '../user/user.module';
import { ResumeProject } from './entity/resumeProject.entity';
import { ResumeProjectController } from './resumeProject.controller';
import { ResumeProjectService } from './resumeProject.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ResumeProject]),
        PassportModule,
        UserModule,
        ResumeModule
    ],
    controllers: [ResumeProjectController],
    providers: [
        ResumeProjectService,
        JwtStrategy
    ]
})
export class ResumeProjectModule {}
