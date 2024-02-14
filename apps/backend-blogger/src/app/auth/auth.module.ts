import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { AuthStrategy } from './strategy/auth.strategy';
import { TokenGuard } from './guard/token.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_TIMEOUT
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthStrategy,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: TokenGuard
    }
  ],
})
export class AuthModule { }
