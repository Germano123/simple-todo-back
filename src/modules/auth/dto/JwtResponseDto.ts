export class JwtResponseDto {
    access_token: string;

    constructor(accessToken: string, renewalToken: string) {
        this.access_token = accessToken;
    }
}
