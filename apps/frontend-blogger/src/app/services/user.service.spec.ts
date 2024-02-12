import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { User } from "../interface/user.interface";
import { Account } from "../enums/account.enum";

describe('User Service', () => {
    let service: UserService;
    let result;

    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    let url = 'http://localhost:3000/users'; 

    let id = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

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
    
        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(mockUser);
        expect(req.request.url).toEqual(url);
        httpMock.verify();
    });

    it('should be able to get users from the getUser$ endpoint', () => {
        service.getUser$(id).subscribe((any) => result = any);

        const req = httpMock.expectOne(`${url}/${id}`);
        expect(req.request.method).toEqual('GET');
        expect(req.request.url).toEqual(`${url}/${id}`);
        httpMock.verify();
    });

    it('should be able to get all users the getAllUser$ endpoint', () => {
        service.getAllUser$().subscribe((any) => result = any);

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('GET');
        expect(req.request.url).toEqual(url);
        httpMock.verify();
    });

    it('should be able to patch the users with the updateUser$ endpoint', () => {
        let updatedUser: User = {
            firstname: 'phil',
            lastname: 'teasdale',
            email: 'phil@teasdale.com',
            account: Account.Blogger
        }

        service.updateUser$(id, updatedUser).subscribe((any) => result = any);

        const req = httpMock.expectOne(`${url}/${id}`);
        expect(req.request.method).toEqual('PATCH');
        expect(req.request.body).toEqual(updatedUser);
        expect(req.request.url).toEqual(`${url}/${id}`);
        httpMock.verify();
    });

    it('should be able to delete the users with the deleteUsers$ endpoint', () => {
        service.deleteUsers$(id).subscribe((any) => result = any);

        const req = httpMock.expectOne(`${url}/${id}`);
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.url).toEqual(`${url}/${id}`);
        httpMock.verify();
    });
});