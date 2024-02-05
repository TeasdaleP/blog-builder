import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiGatewayTimeoutResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpOkDesc, HttpTimeoutDesc } from '../app.constants';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ description: 'This POST request for adding a blog post is implemented when the user wants to add a new blog post.' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ description: 'This GET request allows users to retrieve all blog posts' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ description: 'This GET request allows users to retrieve one particular blog post by the ID' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ description: 'This PATCH request allows users to update one particular blog post by the ID' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ description: 'This DELETE request allows users to remove one particular blog post by the ID' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
