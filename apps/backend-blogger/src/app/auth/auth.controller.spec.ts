import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

describe('Auth Controller', () => {
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

  it('should be able to login', async() => {
    let login: LoginAuthDto = {
      email: 'phil@teasdale.com',
      password: 'password'
    }

    await controller.login(login);
    expect(service.login).toHaveBeenCalledWith(login);
  });
});
