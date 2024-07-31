import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityDto } from './dto/activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { AuthUserDto } from '../auth/dto/AuthUserDto';
import { UserService } from '../user/user.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly repo: Repository<Activity>,
    private readonly userService: UserService,
  ) {}

  async findOneBy(options: Partial<ActivityDto>): Promise<Activity> {
    return await this.repo.findOneBy({
      id: options.id,
      title: options.title,
    });
  }

  async create(
    loggedUser: AuthUserDto,
    createActivityDto: CreateActivityDto
  ): Promise<ActivityDto> {
    const user = await this.userService.findOneBy({ email: loggedUser.email });
    let activity = this.repo.create();
    
    activity = { 
      ...activity,
      ...createActivityDto,
      owner: user,
    }

    console.log(activity);
    
    await this.repo.save(createActivityDto);
    
    return new ActivityDto(activity);
  }

  async findAll(): Promise<ActivityDto[]> {
    const activities = await this.repo.find();
    return activities.map((activity) => new ActivityDto(activity));
  }

  async findOne(id: string): Promise<ActivityDto> {
    const activity = await this.findOneBy({ id })
    return new ActivityDto(activity);
  }

  async update(
    loggedUser: AuthUserDto,
    id: string,
    updateActivityDto: UpdateActivityDto
  ): Promise<ActivityDto> {
    let activity = await this.findOneBy({ id });
    activity = { ...activity, ...updateActivityDto };
    await this.repo.update(id, updateActivityDto);
    return new ActivityDto(activity);
  }

  async remove(
    loggedUser: AuthUserDto,
    id: string
  ): Promise<ActivityDto> {
    const activity = await this.findOneBy({ id });
    await this.repo.delete(id);
    return new ActivityDto(activity);
  }
}
