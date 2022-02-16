import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { RecommendationController } from './recommendation.controller';

@Module({
    imports: [
        HttpModule.register({
            timeout: 50000
        }),
        PassportModule,
        UserModule
    ],
    controllers: [RecommendationController],
    providers: [
        JwtStrategy,
    ]
})
export class RecommendationModule {}
