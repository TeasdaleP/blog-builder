import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

describe('Posts Controller', () => {
  let controller: PostsController;
  let service: PostsService;

  let UUID = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

  let PART_POST_DATA = {
    title: 'the title for the partial test data object',
    date: new Date(),
    description: 'the description for the pertial test data object'
  }

  let FULL_POST_DATA = {
    title: 'the title for the full test data object',
    date: new Date(),
    author: 'the author for the full test data object',
    description: 'the description for the full test data object',
    tags: [],
    images: [],
    comments: []
  }

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
    let newPost: CreatePostDto = FULL_POST_DATA;

    await controller.create(newPost);
    expect(service.create).toHaveBeenCalledWith(newPost);
  });

  describe('findAll & findOne', () => {
    it('should be able to find all records without a payload', async() => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should be able to find one record with a payload', async() => {
      let id = UUID;
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  it('should be able to update one record with partial payload',async () => {
    let id = UUID;
    let updatedPost: UpdatePostDto = PART_POST_DATA;

    await controller.update(id, updatedPost);
    expect(service.update).toHaveBeenCalledWith(id, updatedPost);
  });

  it('should be able to successfully delete a post with the correct id', async() => {
    let id = UUID;
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });

});
