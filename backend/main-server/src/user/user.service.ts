import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInfoRequestDto } from './dto/createUserInfoRequestDto';
import { UpdateUserInfoRequestDto } from './dto/updateUserInfoRequestDto';
import { User } from './entity/user.entity';
import { UserInfo } from './entity/userInfo.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>
  ) {}

  // findAll(): Promise<User[]> {
  //   return this.userRepository.find();
  // }

  getUser(kakaoId: string): Promise<User> {
    console.log(`[DB] Get User : ${kakaoId}`)

    return this.userRepository.findOne({
      where: {
        kakaoId: kakaoId
      }
    });
  }

  getUserWithUserInfo(kakaoId: string): Promise<User> {
    console.log(`[DB] Get User & UserInfo: ${kakaoId}`)

    return this.userRepository.findOne({
      relations: ["userInfos"],
      where: {
        kakaoId: kakaoId
      }
    });
  }

  // async remove(id: string): Promise<void> {
  //   await this.userRepository.delete(id);
  // }

  async createUser(kakaoId: number, nickname: string, profile_image_url: string): Promise<any> {
    console.log(`[DB] Create User : ${kakaoId}, ${nickname}, ${profile_image_url}`)
    
    return await this.userRepository.insert({
      kakaoId: kakaoId,
      nickname: nickname,
      profileImage: profile_image_url,
      agreeToTerms: false
    })
  }

  async createUserInfo(createUserInfoRequestDto: CreateUserInfoRequestDto, user: User): Promise<any> {
    const { name, email, university, major, grade, languageScore, career, activity, license } = createUserInfoRequestDto;
    console.log(`[DB] Create UserInfo : ${name}, ${email}, ${university}, ${major}, ${grade}, ${languageScore}, ${career}, ${activity}, ${license}`)
    
    return await this.userInfoRepository.insert({
      name: name,
      email: email,
      university: university,
      major: major,
      grade: grade,
      languageScore: languageScore,
      career: career,
      activity: activity,
      license: license,
      user: user
    })
  }

  async updateUserInfo(updateUserInfoRequestDto: UpdateUserInfoRequestDto, user: User): Promise<any> {
    const { name, email, university, major, grade, languageScore, career, activity, license } = updateUserInfoRequestDto;
    console.log(`[DB] Update UserInfo : ${name}, ${email}, ${university}, ${major}, ${grade}, ${languageScore}, ${career}, ${activity}, ${license}`)

    return await this.userInfoRepository.update({
        user: user
      }, {
        name: name,
        email: email,
        university: university,
        major: major,
        grade: grade,
        languageScore: languageScore,
        career: career,
        activity: activity,
        license: license
    })
  }
}