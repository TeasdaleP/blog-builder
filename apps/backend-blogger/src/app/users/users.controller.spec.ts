import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  const UUID = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

  const mockUser = {
    firstname: 'Phil',
    lastname: 'Teasdale',
    email: 'phil@teasdale.com',
    password: 'password',
    account: 'USER'
  }

  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: mockUserService
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create user via the API enpoint', async() => {
    const newPost: CreateUserDto = mockUser;

    await controller.register(newPost);
    expect(service.create).toHaveBeenCalledWith(newPost);
  });

  it('should be able to find all records without a payload', async() => {
    await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should be able to find one record with a payload', async() => {
    await controller.findOne(UUID);
    expect(service.findOne).toHaveBeenCalledWith(UUID);
  });

  it('should be able to update user record with partial payload', async() => {
    const updateUser: UpdateUserDto = {
      email: 'phil@new.email',
      account: 'ADMIN'
    }

    await controller.update(UUID, updateUser);
    expect(service.update).toHaveBeenCalledWith(UUID, updateUser);
  });

  it('should be able to delete a user with the correct id', async() => {
    await controller.remove(UUID);
    expect(service.remove).toHaveBeenCalledWith(UUID);
  });
});
