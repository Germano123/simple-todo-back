import { Injectable } from '@nestjs/common';
import { AuthUserDto } from './dto/AuthUserDto';
import { CreateUserDto } from '../user/dto/CreateUserDto';
import { CredentialsDto } from './dto/CredentialsDto';
import { UserDto } from '../user/dto/UserDto';

@Injectable()
export abstract class AuthService {
  abstract validateUser(credentials: CredentialsDto): Promise<UserDto>;
  abstract getAuthUser(user: AuthUserDto): Promise<UserDto>;
  abstract login(credentials: CredentialsDto): Promise<AuthUserDto>;
  abstract registerUser(createUserDto: CreateUserDto): Promise<UserDto>;
}
