import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

describe('Comments Controller', () => {
  let controller: CommentsController;
  let service: CommentsService;

  let mockCommentsService = {}

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

  it('should be able to create a comment via this API endpoint', () => {});

  describe('findAll & findOne', () => {
    it('should be able to find all comments via this API endpoint', () => {});

    it('should be able to find comments related to a specific blog via this API endpoint', () => {});
  });

  it('should be able to successfully delete a comment with this API endpoint', () => {});
});
