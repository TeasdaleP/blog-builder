import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  create(createDto: CreateUserDto): Promise<Record<string, any>> {
    const user: User = new User();

    user.firstname = createDto.firstname,
    user.lastname = createDto.lastname,
    user.email = createDto.email,
    user.password = bcrypt.hashSync(createDto.password, 10),
    user.account = createDto.account

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = new User();

    user.id = id, 
    user.firstname = updateUserDto.firstname,
    user.lastname = updateUserDto.lastname,
    user.email = updateUserDto.password,
    user.account = updateUserDto.account

    return this.userRepository.save(user);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
