import { JwtResponseDto } from './JwtResponseDto';

export class AuthUserDto {
    name: string;
    email: string;
    jwt: JwtResponseDto;

    constructor(name: string, email: string, jwt: JwtResponseDto) {
        this.name = name;
        this.email = email;
        this.jwt = jwt;
    }
}
