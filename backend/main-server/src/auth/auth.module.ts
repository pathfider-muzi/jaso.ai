import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
      HttpModule.register({
        timeout: 5000
      }),
      ConfigModule.forRoot(),
      UserModule, 
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {expiresIn: '300s'}
      }),
    ],
    controllers: [AuthController],
    providers: [
      AuthService, 
      UserService
    ]
})
export class AuthModule {}
