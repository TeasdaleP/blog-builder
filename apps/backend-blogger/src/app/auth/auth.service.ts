import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { HttpInvalidResponse } from '../../app.constants';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Auth) private readonly usersRepository: Repository<Auth>,
    private jwtService: JwtService
  ) {}

  create(createDto: CreateAuthDto): Promise<Record<string, any>> {
    const user: Auth = new Auth();

    user.firstname = createDto.firstname,
    user.lastname = createDto.lastname,
    user.email = createDto.email,
    user.password = bcrypt.hashSync(createDto.password, 10),
    user.account = createDto.account

    return this.usersRepository.save(user);
  }

  async login(loginDto: LoginAuthDto): Promise<Record<string, any>> {
    const user = await this.usersRepository.findOneBy({ email: loginDto.email });
    if (!user) {
      return this.getResponse(401, HttpInvalidResponse)
    } 

    const validated = bcrypt.compareSync(loginDto.password, user.password);
    
    if (validated) {
      const token = this.jwtService.sign({ email: user.email })
      return  this.getResponse(201, { id: user.id, token: token })
    } else {
      return this.getResponse(401, HttpInvalidResponse)
    }
  }

  private getResponse(code: number, object: any): any {
    return { status: code, response: object }
  }
}
