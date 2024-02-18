import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

describe('Comments Controller', () => {
  let controller: CommentsController;
  let service: CommentsService;

  let UUID = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

  let mockCommentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [{
        provide: CommentsService,
        useValue: mockCommentsService
      }],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a comment via this API endpoint', async() => {
    let newComment: CreateCommentDto = {
      date: new Date(),
      author: 'Phil Teasdale',
      comment: 'this is my comment',
      blogId: UUID
    }

    await controller.create(newComment);
    expect(service.create).toHaveBeenCalledWith(newComment);
  });

  describe('findAll & findOne', () => {
    it('should be able to find all comments via this API endpoint', async() => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled()
    });

    it('should be able to find comments related to a specific blog via this API endpoint', async() => {
      let id = UUID;
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  it('should be able to successfully delete a comment with this API endpoint', async() => {
    let comment: Comment = {
      id: UUID,
      date: new Date(),
      author: 'Phil Teasdale',
      comment: 'this is my comment',
    }

    await controller.remove(comment, UUID);
    expect(service.remove).toHaveBeenCalledWith(comment.id, UUID);
  });
});
