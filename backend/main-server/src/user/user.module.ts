import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UserInfo } from './entity/userInfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserInfo]),
    PassportModule
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    JwtStrategy
  ],
  exports: [
    UserService,
    TypeOrmModule
  ]
})
export class UserModule {}
