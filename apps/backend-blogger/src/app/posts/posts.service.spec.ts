import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import * as LIBRARY from 'posts-data/src/index';

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: Repository<Post>;

  let mockPostRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository
        }
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(postRepository).toBeDefined()
  });

  describe('create', () => {
    it('should be able to successfully save a quote with correct paylaod', async() => {
      let newPost: CreatePostDto = LIBRARY.FULL_POST_DATA;
  
      await service.create(newPost);
      expect(postRepository.save).toHaveBeenCalledWith(newPost);
    });
  });

  describe('findAll & findOne', () => {
    it('should be able to find all records without a payload', async() => {
      await service.findAll();
      expect(postRepository.find).toHaveBeenCalled();
    });

    it('should be able to find one record with a payload', async() => {
      let id = '1234-sdassad-5678';
      await service.findOne(id);
      expect(postRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('update', () => {
    it('should be able to successfully update a post correct paylaod', async() => {
      let id = LIBRARY.UUID[0];
      let updatedPost: UpdatePostDto = LIBRARY.PART_POST_DATA;
  
      await service.update(id, updatedPost);
      expect(postRepository.save).toHaveBeenCalledWith({
        id: id,
        ...updatedPost
      });
    });
  });

  describe('remove', () => {
    it('should be able to successfully delete a post with the correct id', async() => {
      let id = LIBRARY.UUID[0];
      await service.remove(id);
      expect(postRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
