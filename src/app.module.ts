import { Module } from '@nestjs/common';
import { ActivityModule } from './modules/activity/activity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigService } from './shared/services/api-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ApiConfigService],
      useFactory: (config: ApiConfigService) => {
        return config.typeOrmConfig;
      },
    }),
    AuthModule,
    SharedModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
