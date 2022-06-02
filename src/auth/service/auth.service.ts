import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { SignInCredentialsDto } from "../dto/signin-credentials.dto";
import { SignupCredentialsDto } from "../dto/signup-credentials.dto";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interface/jwt-payload.interface";
import { UserRepository } from "../repository/user.repository";

import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<{ message: string }> {
        return this.userRepository.signUp(signupCredentialsDto)
    }

    async signIn(signInCredentialsDto: SignInCredentialsDto): Promise<{ accessToken: string, refreshToken: string, user: JwtPayload }> {
        const resp = await this.userRepository.validateUserPassword(signInCredentialsDto)
        if (!resp) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const accessToken = await this.getAccessToken(resp)
        const refreshToken = await this.getRefreshToken(resp)

        await this.updateRefreshTokenInUser(refreshToken, resp.username)

        return {
            accessToken,
            refreshToken,
            user: resp
        }
    }

    async signOut(user: User) {
        await this.updateRefreshTokenInUser(null, user.username)
    }

    async updateRefreshTokenInUser(refreshToken, username) {
        if (refreshToken) {
            refreshToken = await bcrypt.hash(refreshToken, 10)
        }

        await this.userRepository.update({ username: username }, {
            hashedRefreshToken: refreshToken
        })
    }

    async getAccessToken(payload: JwtPayload) {
        const accessToken = await this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: +process.env.JWT_EXPIRES_IN
        })
        return accessToken
    }

    async getRefreshToken(payload: JwtPayload) {
        const refreshToken = await this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: +process.env.JWT_REFRESH_EXPIRES_IN
        })
        return refreshToken
    }

    async getNewAccessAndRefreshToken(payload: JwtPayload) {
        const refreshToken = await this.getRefreshToken(payload)
        await this.updateRefreshTokenInUser(refreshToken, payload.username)

        return {
            accessToken: await this.getAccessToken(payload),
            refreshToken: refreshToken
        }
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
        const user = await this.userRepository.getUserInfoByUsername(username)

        const isRefreshTokenMatching = await user.hashedRefreshToken != null ? bcrypt.compare(
            refreshToken,
            user.hashedRefreshToken
        ) : false

        if (isRefreshTokenMatching) {
            await this.updateRefreshTokenInUser(null, username)
            return user;
        } else {
            throw new UnauthorizedException()
        }
    }
}
