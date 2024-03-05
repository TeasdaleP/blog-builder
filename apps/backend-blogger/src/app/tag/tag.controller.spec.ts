import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

describe('Tag Controller', () => {
  let controller: TagController;
  let service: TagService;

  const UUID = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

  const mockTagService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [{
        provide: TagService,
        useValue: mockTagService
      }],
    }).compile();

    service = module.get<TagService>(TagService);
    controller = module.get<TagController>(TagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a new tag via this api endpoint', async() => {
    const newTag: CreateTagDto = {
      name: 'Blogging'
    }

    await controller.create(newTag);
    expect(service.create).toHaveBeenCalled();
  });

  it('should be able to find all tags via this api endpoint', async() => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should be able to update a tag via this api endpoint', async() => {
    const updatedTag: Tag = {
      id: UUID,
      name: 'Lifestyle'
    }

    await controller.update(UUID, updatedTag);
    expect(service.update).toHaveBeenCalled();
  });

  it('should be able to delete a tag via this api endpoint', async() => {
    await controller.remove(UUID);
    expect(service.remove).toHaveBeenCalled();
  });
});
