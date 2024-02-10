import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import * as LIBRARY from 'posts-data/src/index';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  let mockPostService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{
        provide: PostsService,
        useValue: mockPostService
      }],
    }).compile();

    service = module.get<PostsService>(PostsService);
    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create post via the API endpoint', async() => {
    let newPost: CreatePostDto = LIBRARY.FULL_POST_DATA;

    await controller.create(newPost);
    expect(service.create).toHaveBeenCalledWith(newPost);
  });

  describe('findAll & findOne', () => {
    it('should be able to find all records without a payload', async() => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should be able to find one record with a payload', async() => {
      let id = LIBRARY.UUID[0];
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  it('should be able to update one record with partial payload',async () => {
    let id = LIBRARY.UUID[0];
    let updatedPost: UpdatePostDto = LIBRARY.PART_POST_DATA;

    await controller.update(id, updatedPost);
    expect(service.update).toHaveBeenCalledWith(id, updatedPost);
  });

  it('should be able to successfully delete a post with the correct id', async() => {
    let id = LIBRARY.UUID[0];
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });

});