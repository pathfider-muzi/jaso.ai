import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    // generates JWT using Kakao userInfo
    async generateJWT(user: any) {
        const payload = { user: user };
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
