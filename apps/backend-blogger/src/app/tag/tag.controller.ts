import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBadRequestResponse, ApiGatewayTimeoutResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpOkDesc, HttpTimeoutDesc, HttpBadRequestDesc } from '../../app.constants';
import { Public } from '../auth/guard/token.guard';

@ApiTags('Tags')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ description: 'This POST request is for adding a tag to a blog post for filtering and searching' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @ApiBadRequestResponse({ description: HttpBadRequestDesc })
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Public()
  @ApiOperation({ description: 'This GET request retrieves all tags' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @ApiBadRequestResponse({ description: HttpBadRequestDesc })
  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @ApiOperation({ description: 'This PATCH request allows users to update one particular tag by the ID' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @ApiOperation({ description: 'This DELETE request allows admins to remove one particular tag if they are logged in' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @ApiBadRequestResponse({ description: HttpBadRequestDesc })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
