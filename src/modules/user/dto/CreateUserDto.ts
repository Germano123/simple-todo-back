import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiPropertyOptional()
    name: string;
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
