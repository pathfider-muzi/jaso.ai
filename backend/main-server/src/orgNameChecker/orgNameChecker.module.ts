import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { OrgNameCheckerController } from './orgNameChecker.controller';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000
        }),
        PassportModule,
    ],
    controllers: [OrgNameCheckerController],
    providers: [
        JwtStrategy
    ]
})
export class OrgNameCheckerModule {}
