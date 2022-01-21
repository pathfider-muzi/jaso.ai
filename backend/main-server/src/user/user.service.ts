import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { AgreeToTermsRequestDto } from './dto/agreeToTermsRequestDto';
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

  getUser(kakaoId: number): Promise<User> {
    console.log(`[DB] Get User : ${kakaoId}`);

    return this.userRepository.findOne({
      relations: ["userInfos", "selfIntroductions", "selfIntroductions.qnas"],
      where: {
        kakaoId
      }
    });
  }

  async createUser(kakaoId: number, nickname: string, profile_image_url: string): Promise<any> {
    console.log(`[DB] Create User : ${kakaoId}, ${nickname}, ${profile_image_url}`);
    
    return await this.userRepository.insert({
      kakaoId,
      nickname,
      profileImage: profile_image_url,
      agreeToTerms: false
    })
  }

  async updateUser(kakaoId: number, nickname: string, profile_image_url: string): Promise<any> {
    console.log(`[DB] Update User : ${kakaoId}, ${nickname}, ${profile_image_url}`);

    return await this.userRepository.update({
      kakaoId
    }, {
      kakaoId,
      nickname,
      profileImage: profile_image_url,
      agreeToTerms: false
    })
  }

  async deleteUser(kakaoId: number): Promise<DeleteResult> {
    console.log(`[DB] Delete User : ${kakaoId}`);

    return await this.userRepository.delete({
      kakaoId
    })
  }

  async createUserInfo(createUserInfoRequestDto: CreateUserInfoRequestDto, user: User): Promise<InsertResult> {
    const { name, email, university, major, grade, languageScore, career, activity, license } = createUserInfoRequestDto;
    console.log(`[DB] Create UserInfo : ${user.kakaoId} ${name}, ${email}, ${university}, ${major}, ${grade}, ${languageScore}, ${career}, ${activity}, ${license}`);
   
    return await this.userInfoRepository.insert({
      name,
      email,
      university,
      major,
      grade,
      languageScore,
      career,
      activity,
      license,
      user
    })
  }

  async updateUserInfo(updateUserInfoRequestDto: UpdateUserInfoRequestDto, user: User): Promise<UpdateResult> {
    const { name, email, university, major, grade, languageScore, career, activity, license } = updateUserInfoRequestDto;
    console.log(`[DB] Update UserInfo : ${user.kakaoId} ${name}, ${email}, ${university}, ${major}, ${grade}, ${languageScore}, ${career}, ${activity}, ${license}`);

    return await this.userInfoRepository.update({
        user
      }, {
        name,
        email,
        university,
        major,
        grade,
        languageScore,
        career,
        activity,
        license
    })
  }

  async deleteUserInfo(user: User): Promise<DeleteResult> {
    console.log(`[DB] Delete UserInfo : ${user.kakaoId}`);

    return await this.userInfoRepository.delete({
      user
    })
  }

  async agreeToTerms(agreeToTermsRequestDto: AgreeToTermsRequestDto, kakaoId: number): Promise<UpdateResult> {
    const { agreeToTerms } = agreeToTermsRequestDto;
    console.log(`[DB] Agree To Terms : ${kakaoId}`)

    return await this.userRepository.update({
      kakaoId
    }, {
      agreeToTerms: true
    })
  }
}