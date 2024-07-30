import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindUserDto {
    @ApiPropertyOptional()
    id: string;
    
    @ApiPropertyOptional()
    name: string;
    
    @ApiPropertyOptional()
    cpf: string;

    @ApiPropertyOptional()
    email: string;
}
