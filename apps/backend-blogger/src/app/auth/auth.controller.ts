import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiGatewayTimeoutResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpOkDesc, HttpTimeoutDesc, HttpUnAuthDesc } from '../../app.constants';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from './guard/token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @Post('login')
  @ApiOperation({ description: 'This POST request is for validating that a user is registered and authenticates login'})
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiUnauthorizedResponse({ description: HttpUnAuthDesc  })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  async login(@Body() loginDto: LoginAuthDto) {
    return await this.authService.login(loginDto);
  }
}
