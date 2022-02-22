import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BullModule } from '@nestjs/bull';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserModule } from '../user/user.module';
import { GenerationController } from './generation.controller';
import { GenerationService } from './generation.service';
import { MessageConsumer } from './message.consumer';

@Module({
  imports: [
    HttpModule.register({
      timeout: 500000
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }),
    PassportModule,
    UserModule
  ],
  controllers: [GenerationController],
  providers: [
    JwtStrategy,
    GenerationService,
    MessageConsumer
  ]
})
export class GenerationModule {}
