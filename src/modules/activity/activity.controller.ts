import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { ApiResponse } from "../../common/api-response";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthUserDto } from "../auth/dto/AuthUserDto";
import { AuthUser } from "src/decorators/auth-user.decorator";

@ApiTags("Activities")
@Controller("activity")
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post("create-activity")
  @ApiBearerAuth()
  async create(
    @AuthUser() loggedUser: AuthUserDto,
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<ApiResponse> {
    const activity = await this.activityService.create(loggedUser, createActivityDto);
    return new ApiResponse(200, "", activity);
  }

  @Get("get-all-activities")
  async findAll(): Promise<ApiResponse> {
    const activities = await this.activityService.findAll();
    return new ApiResponse(200, "", activities);
  }

  @Get("get-activity/:id")
  async findOne(@Param("id") id: string): Promise<ApiResponse> {
    const activity = await this.activityService.findOne(id);
    return new ApiResponse(200, "", activity);
  }

  @Patch("update-activity/:id")
  @ApiBearerAuth()
  async update(
    @AuthUser() loggedUser: AuthUserDto,
    @Param("id") id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<ApiResponse> {
    const activity = await this.activityService.update(loggedUser, id, updateActivityDto);
    return new ApiResponse(200, "", activity);
  }

  @Delete("delete-activity/:id")
  @ApiBearerAuth()
  async remove(
    @AuthUser() loggedUser: AuthUserDto,
    @Param("id") id: string,
  ): Promise<ApiResponse> {
    const activity = await this.activityService.remove(loggedUser, id);
    return new ApiResponse(200, "", activity);
  }
}
