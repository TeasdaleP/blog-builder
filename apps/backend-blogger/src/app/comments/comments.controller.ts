import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBadRequestResponse, ApiGatewayTimeoutResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpBadRequestDesc, HttpOkDesc, HttpTimeoutDesc } from '../../app.constants';
import { Public } from '../auth/guard/token.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ description: 'This POST request for adding a comment to a blog post is implemented when the user is logged in and comments on a specific post.' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @ApiBadRequestResponse({ description: HttpBadRequestDesc })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto ) {
    return this.commentsService.create(createCommentDto);
  }

  @Public()
  @ApiOperation({ description: 'This GET request retrieves all comments related to a specific blog post by providing the blog post id (not the comment id)' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @ApiBadRequestResponse({ description: HttpBadRequestDesc })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @ApiOperation({ description: 'This GET request retrieves all comments' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @ApiBadRequestResponse({ description: HttpBadRequestDesc })
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({ description: 'This DELETE request allows users to remove one particular comment if they are logged in' })
  @ApiOkResponse({ description: HttpOkDesc })
  @ApiGatewayTimeoutResponse({ description: HttpTimeoutDesc })
  @ApiBadRequestResponse({ description: HttpBadRequestDesc })
  @Delete(':id')
  remove(@Body() body: any, @Param('id') id: string) {
    return this.commentsService.remove(body.id, id);
  }
}
