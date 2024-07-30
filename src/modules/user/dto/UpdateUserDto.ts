import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional()
    name: string;
    
    @ApiPropertyOptional()
    email: string;
    
    @ApiPropertyOptional()
    cpf: string;
    
    @ApiPropertyOptional()
    password: string;
}
