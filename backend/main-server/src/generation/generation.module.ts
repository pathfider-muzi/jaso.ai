import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import * as redisStore from 'cache-manager-redis-store';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserModule } from '../user/user.module';
import { GenerationController } from './generation.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 500000
    }),
    PassportModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379
    }),
    UserModule
  ],
  controllers: [GenerationController],
  providers: [
    JwtStrategy
  ]
})
export class GenerationModule {}
