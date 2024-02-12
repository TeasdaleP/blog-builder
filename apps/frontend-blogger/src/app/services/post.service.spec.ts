import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { Post } from "../interface/post.data";
import { PostService } from "./post.service";

describe('Post Service', () => {
    let service: PostService;
    let result;

    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    let url = 'http://localhost:3000/posts'; 

    let id = '9ec04e53-d82a-452e-835d-dfc471f94bb1';

    let mockPost: Post = {
        title: 'title',
        date: new Date(),
        author: 'author',
        description: 'description',
        tags: [],
        images: [],
        comments: []
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PostService]
        });

        service = TestBed.inject(PostService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    it('service should be created', () => {
        expect(service).toBeTruthy();
    });

    it('service should allow to add posts', () => {
        service.addPost$(mockPost).subscribe((any) => result = any);
    
        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(mockPost);
        expect(req.request.url).toEqual(url);
        httpMock.verify();
    });

    it('service should allow to get posts', () => {
        service.getAllPosts$().subscribe((any) => result = any);

        const req = httpMock.expectOne(url);
        expect(req.request.method).toEqual('GET');
        expect(req.request.url).toEqual(url);
        httpMock.verify();
    });

    it('service should allow to delete posts', () => {
        service.deletePost$(id).subscribe((any) => result = any);

        const req = httpMock.expectOne(`${url}/${id}`);
        expect(req.request.method).toEqual('DELETE');
        expect(req.request.url).toEqual(`${url}/${id}`);
        httpMock.verify();
    });
});