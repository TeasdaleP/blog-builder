import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

describe('Comments Service', () => {
  let service: CommentsService;
  let commentRepository: Repository<Comment>;

  let UUID = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

  let mockCommentRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn()
  }

  let mockGetRepository = {
    findOneBy: jest.fn(),
    findBy: jest.fn(),
    save: jest.fn()
  }

  let mockDataSource = {
    getRepository: jest.fn().mockReturnValue(mockGetRepository)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository
        },
        {
          provide: DataSource,
          useValue: mockDataSource
        }
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(commentRepository).toBeDefined()
  });

  describe('create', () => {
    it('should be able to create a comment and update the post payload with comment id', () => {});

    it('should hit a bad request exception when comments dont save effectively', () => {});

    it('should hit a bad request exception when blog post isnt found by id', () => {});

    it('should hit a bad request exception when blog post isnt updated', () => {});
  });

  it('should be able to find all comments', () => {});

  describe('find one', () => {
    it('should be able to find all comments which are related to a blog post', () => {});

    it('should hit bad request exception when the blog post isnt found by id', () => {});
  });

  describe('delete', () => {
    it('should be able to delete the comment and remove reference from the post', () => {});

    it('should hit bad request exception when the blog post cant be found', () => {});

    it('should hit bad request exception when the blog post cant be updated', () => {});
  });
});
