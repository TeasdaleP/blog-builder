import { Test } from "@nestjs/testing";
import { TokenGuard } from "./token.guard";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

describe('Token Guard', () => {
    let guard: TokenGuard;

    const mockReflector = {}

    const mockJwtService = {}

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                TokenGuard,
                {
                    provide: JwtService,
                    useValue: mockJwtService
                },
                {
                    provide: Reflector,
                    useValue: mockReflector
                }
            ],
        }).compile();

        guard = moduleRef.get<TokenGuard>(TokenGuard);
    });

    it('should be defined', () => {
        expect(guard).toBeDefined()
    });
});