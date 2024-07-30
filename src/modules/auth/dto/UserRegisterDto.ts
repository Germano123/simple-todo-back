import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserRegisterDto {
    @ApiPropertyOptional()
    name: string;
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    cpf: string;

    @ApiProperty()
    password: string;
}
