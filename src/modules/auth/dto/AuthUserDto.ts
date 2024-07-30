import { JwtResponseDto } from './JwtResponseDto';

export class AuthUserDto {
    user: { name: string, email: string };
    jwt: JwtResponseDto;

    constructor(user: { name: string, email: string }, jwt: JwtResponseDto) {
        this.user = user;
        this.jwt = jwt;
    }
}
