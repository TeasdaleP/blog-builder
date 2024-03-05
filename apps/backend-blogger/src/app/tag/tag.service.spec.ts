import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTagDto } from './dto/create-tag.dto';

describe('Tag Service', () => {
  let service: TagService;
  let tagRepository: Repository<Tag>;

  const UUID = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

  const PART_TAG_DATA: CreateTagDto = {
    name: 'Blogging'
  }

  const mockTagRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getRepositoryToken(Tag),
          useValue: mockTagRepository
        }
      ],
    }).compile();

    service = module.get<TagService>(TagService);
    tagRepository = module.get<Repository<Tag>>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(tagRepository).toBeDefined();
  });

  it('should be able to create a tag', async() => {
    const newTag: CreateTagDto = PART_TAG_DATA;

    await service.create(newTag);
    expect(tagRepository.save).toHaveBeenCalledWith(newTag);
  });

  it('should be able to find all tags', async() => {
    await service.findAll();
    expect(tagRepository.find).toHaveBeenCalled();
  });

  it('should be able to delete a single tag', async() => {
    await service.remove(UUID);
    expect(tagRepository.delete).toHaveBeenCalledWith(UUID);
  });
});
