import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { User } from "../interface/user.interface";
import { Account } from "../enums/account.enum";
import { environment } from "../../environments/environment";

describe('User Service', () => {
    let service: UserService;
    let result;

    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    let id = '9ec04e53-d82a-452e-835d-dfc471f94bb1';
    let token = '5s7xx1gkUP8JeSAVyrAtgKF7yPeCCkZ6GOEdXJmrRoabg1RF2eLlVidjlbH8qkiF3zKFddz1x4KmXLmBzgYUst0l9EEDWQe2IQA7';

    let mockUser: User = {
        firstname: 'phil',
        lastname: 'teasdale',
        email: 'phil@teasdale.com',
        account: Account.User
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserService]
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    it('service should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to post to the register$ endpoint', () => {
        service.register$(mockUser).subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/users`);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(mockUser);
        expect(JSON.stringify(req.request.headers)).not.toContain(token);
        expect(req.request.url).toEqual(`${environment.backend}/users`);
        httpMock.verify();
    });

    it('should be able to get users from the getUser$ endpoint', () => {
        service.getUser$(id, token).subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/users/${id}`);

        expect(req.request.method).toEqual('GET');
        expect(req.request.url).toEqual(`${environment.backend}/users/${id}`);
        httpMock.verify();
    });

    it('should be able to get all users the getAllUser$ endpoint', () => {
        service.getAllUser$(token).subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/users`);

        expect(req.request.method).toEqual('GET');
        expect(JSON.stringify(req.request.headers)).toContain(token);
        expect(req.request.url).toEqual(`${environment.backend}/users`);
        httpMock.verify();
    });

    it('should be able to patch the users with the updateUser$ endpoint', () => {
        let updatedUser: User = {
            firstname: 'phil',
            lastname: 'teasdale',
            email: 'phil@teasdale.com',
            account: Account.Blogger
        }

        service.updateUser$(id, updatedUser, token).subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/users/${id}`);

        expect(req.request.method).toEqual('PATCH');
        expect(JSON.stringify(req.request.headers)).toContain(token);
        expect(req.request.body).toEqual(updatedUser);
        expect(req.request.url).toEqual(`${environment.backend}/users/${id}`);
        httpMock.verify();
    });

    it('should be able to delete the users with the deleteUsers$ endpoint', () => {
        service.deleteUsers$(id, token).subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/users/${id}`);
        
        expect(req.request.method).toEqual('DELETE');
        expect(JSON.stringify(req.request.headers)).toContain(token);
        expect(req.request.url).toEqual(`${environment.backend}/users/${id}`);
        httpMock.verify();
    });
});