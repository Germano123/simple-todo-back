import { Module } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { ActivityController } from "./activity.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Activity } from "./entities/activity.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity]),
    UserModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
