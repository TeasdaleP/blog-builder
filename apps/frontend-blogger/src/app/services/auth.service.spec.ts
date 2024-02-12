import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";

describe('Auth Service', () => {
    let service: AuthService;
    let result;

    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    let url = 'http://localhost:3000/auth/login'; 

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    it('service should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to post to the login endpoint', () => {
        let payload = {
            email: 'phil@teasdale,com',
            password: 'password'
        }

        service.login$(payload.email, payload.password).subscribe((any) => result = any);
    
        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(payload);
        expect(req.request.url).toEqual(url);
        httpMock.verify();
    });
});