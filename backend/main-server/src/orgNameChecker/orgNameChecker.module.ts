import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserModule } from '../user/user.module';
import { OrgNameCheckerController } from './orgNameChecker.controller';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000
        }),
        PassportModule,
        UserModule        
    ],
    controllers: [OrgNameCheckerController],
    providers: [
        JwtStrategy
    ]
})
export class OrgNameCheckerModule {}
