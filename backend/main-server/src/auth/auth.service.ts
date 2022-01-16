import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    // generates JWT using Kakao userInfo
    async generateJWT(kakaoId: number) {
        const payload = { kakaoId: kakaoId };
        
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
