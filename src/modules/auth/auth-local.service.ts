import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from '../user/dto/UserDto';
import { CreateUserDto } from '../user/dto/CreateUserDto';
import { CredentialsDto } from './dto/CredentialsDto';
import { AuthUserDto } from './dto/AuthUserDto';

@Injectable()
export class AuthLocalService implements AuthService {
    
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}
    
    async login(credentials: CredentialsDto): Promise<AuthUserDto> {
        const user = await this.userService.findOneBy({ email: credentials.email });
        const access_token = this.jwtService.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        });
        return new AuthUserDto(user.name, user.email, access_token);
    }
    
    async validateUser(credentials: CredentialsDto): Promise<User> {
        const user = await this.userService.findOneBy({ email: credentials.email });
        
        if (user && user.password === credentials.password) {
            return user;
        }
        return null;
    }

    async registerUser(createUserDto: CreateUserDto): Promise<UserDto> {
        return await this.userService.create(createUserDto);
    }

    async getAuthUser(loggedUser: AuthUserDto): Promise<UserDto> {
        const user = await this.userService.findOneBy({ email: loggedUser.email });
        return new UserDto(user);
    }
}
