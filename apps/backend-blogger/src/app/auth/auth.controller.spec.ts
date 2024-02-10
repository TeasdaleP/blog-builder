import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  let mockAuthervice = {
    create: jest.fn(),
    login: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{
        provide: AuthService,
        useValue: mockAuthervice
      }],
    }).compile();

    service = module.get<AuthService>(AuthService)
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create a user via the API endpoint', async() => {
    let newUser: CreateAuthDto = {
      firstname: 'Phil',
      lastname: 'Teasdale',
      email: 'phil@teasdale.com',
      password: 'pa$$word',
      account: 'USER'
    }

    await controller.register(newUser);
    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenLastCalledWith(newUser);
  });
});
