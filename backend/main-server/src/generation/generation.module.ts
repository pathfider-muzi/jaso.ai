import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserModule } from '../user/user.module';
import { GenerationController } from './generation.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 50000
    }),
    PassportModule,
    UserModule
  ],
  controllers: [GenerationController],
  providers: [
    JwtStrategy
  ]
})
export class GenerationModule {}
