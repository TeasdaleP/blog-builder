import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiGatewayTimeoutResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpOkDesc, HttpTimeoutDesc, HttpUnAuthDesc } from '../../app.constants';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  @ApiOperation({ description: 'This POST request is for adding new users to the blog'})
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  async register(@Body() createDto: CreateAuthDto) {
    return this.authService.create(createDto);
  }

  @Post('login')
  @ApiOperation({ description: 'This POST request is for validating that a user is registered and authenticates login'})
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiUnauthorizedResponse({ description: HttpUnAuthDesc  })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  async login(@Body() loginDto: LoginAuthDto) {
    return await this.authService.login(loginDto);
  }
}
