import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cpf as CpfValidator } from 'cpf-cnpj-validator';

import { User } from './entities/user.entity';
import { UserDto } from './dto/UserDto';
import { FindUserDto } from './dto/FindUserDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findOneBy(options: Partial<FindUserDto>): Promise<User> {
    return await this.repo.findOneBy({
      id: options.id,
      cpf: options.cpf,
      name: options.name,
      email: options.email,
    });
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    let user = this.repo.create();
    
    let cpf = createUserDto.cpf.trim().replace(/[-. ]/g, '');
    cpf = CpfValidator.format(createUserDto.cpf);
    if (!CpfValidator.isValid(createUserDto.cpf)) {
      throw new HttpException({
        reason: "Cpf is invalid",
      }, HttpStatus.BAD_REQUEST);
    }
    
    // TODO: validate email
    // TODO: validate password

    user = { 
      ...user,
      ...createUserDto,
      cpf,
    }
    user = await this.repo.save(createUserDto);
    // console.log(user);
    
    return new UserDto(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.repo.find();
    return users.map((user) => new UserDto(user));
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.findOneBy({ id });
    return new UserDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    let user = await this.findOneBy({ id });
    user = { ...user, ...updateUserDto };
    await this.repo.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<UserDto> {
    const user = await this.findOneBy({ id });
    await this.repo.delete(id);
    return new UserDto(user);
  }
}
