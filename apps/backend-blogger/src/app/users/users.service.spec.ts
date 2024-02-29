import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('Users Service', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  const UUID = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

  const FULL_USER_DATA = {
    firstname: 'Phil',
    lastname: 'Teasdale',
    email: 'phil@teasdale.com',
    password: 'password',
    account: 'USER'
  }

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to successfully register a new user with the correct payload', async() => {
    const newUser: CreateUserDto = FULL_USER_DATA;

    await service.create(newUser);
    expect(userRepository.save).toHaveBeenCalled();
  });

  describe('findAll & findOne', () => {
    it('should be able to find all records without a payload', async() => {
      await service.findAll();
      expect(userRepository.find).toHaveBeenCalled();
    });

    it('should be able to find one record with a payload', async() => {
      await service.findOne(UUID);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: UUID });
    });
  });

  it('should be able to uppdate a user from using a partial data object', () => {
    /** 
     * 
     *  TODO : This test needs to be completed once i have a solution to test encrypted passwords
     * 
     */
  });

  it('should be able to successfully delete a post with the correct id', async() => {
    await service.remove(UUID);
    expect(userRepository.delete).toHaveBeenCalledWith(UUID);
  });
});
