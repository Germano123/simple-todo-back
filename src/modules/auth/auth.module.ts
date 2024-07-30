import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthLocalService } from './auth-local.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../../shared/shared.module';
import { ApiConfigService } from '../../shared/services/api-config.service';

const providers = [
  {
    provide: AuthService,
    useClass: AuthLocalService
  },
  LocalStrategy,
  JwtStrategy,
]

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => {
        return {
          secret: config.jwtConfig.secret,
          signOptions: {
            expiresIn: config.jwtConfig.expiration,
          }
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers,
})
export class AuthModule {}
