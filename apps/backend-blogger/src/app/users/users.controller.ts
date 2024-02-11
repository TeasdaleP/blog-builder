import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiGatewayTimeoutResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpOkDesc, HttpTimeoutDesc, HttpUnAuthDesc } from '../../app.constants';

/**
 *  these request will need to be verified by the guard, specifically verifying the token
 */

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ description: 'This POST request is for adding new users to the blog'})
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  async register(@Body() createDto: CreateUserDto) {
    return this.usersService.create(createDto);
  }

  @Get()
  @ApiOperation({ description: 'This GET request is for retrieving all users of the blog'})
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiUnauthorizedResponse({ description: HttpUnAuthDesc })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'This GET request is for retrieving a specific user of the blog'})
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiUnauthorizedResponse({ description: HttpUnAuthDesc })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ description: 'This PATCH request is for updating users to the blog'})
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiUnauthorizedResponse({ description: HttpUnAuthDesc  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'This DELETE request is for removing users to the blog'})
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiUnauthorizedResponse({ description: HttpUnAuthDesc  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
