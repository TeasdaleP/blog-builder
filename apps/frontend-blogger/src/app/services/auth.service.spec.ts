import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

describe('Auth Service', () => {
    let service: AuthService;
    let result;

    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

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
        const payload = {
            email: 'phil@teasdale,com',
            password: 'password'
        }

        service.login$(payload.email, payload.password).subscribe((any) => result = any);
    
        const req = httpMock.expectOne(`${environment.backend}/auth/login`);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(payload);
        expect(req.request.url).toEqual(`${environment.backend}/auth/login`);
        httpMock.verify();
    });
});