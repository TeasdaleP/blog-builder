import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entities';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectDataSource() private dataSource: DataSource
  ) {}

  async login(loginDto: LoginAuthDto): Promise<Record<string, any>> {
    const user = await this.dataSource.manager.getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = email', { email: loginDto.email })
      .getOne()

    if (!user || user.email !== loginDto.email) {
      throw new UnauthorizedException();
    } 

    const validated = bcrypt.compareSync(loginDto.password, user.password);
    
    if (validated) {
      return {
        id: user.id,
        token: await this.jwtService.signAsync({ email: user.email })
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
