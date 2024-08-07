import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoggedUser } from '../../decorators/logged-user.decorator';

import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

import { User } from '../user/entities/user.entity';
import { AuthUserDto } from './dto/AuthUserDto';
import { CreateUserDto } from '../user/dto/CreateUserDto';
import { CredentialsDto } from './dto/CredentialsDto';
import { ApiResponse } from '../../common/api-response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() credentials: CredentialsDto): Promise<AuthUserDto> {
    return await this.authService.login(credentials);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.authService.registerUser(createUserDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async me(@LoggedUser() loggedUser: AuthUserDto): Promise<ApiResponse> {
    const user = await this.authService.getAuthUser(loggedUser);
    return new ApiResponse(200, "", user);
  }

  @Get('ping-me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async pingme(@LoggedUser() user): Promise<ApiResponse> {
    return new ApiResponse(200, "", user);
  }
}
