import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { Post } from "../interface/post.data";
import { PostService } from "./post.service";
import { environment } from "../../environments/environment";

describe('Post Service', () => {
    let service: PostService;
    let result;

    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    const id = '9ec04e53-d82a-452e-835d-dfc471f94bb1';
    const token = '5s7xx1gkUP8JeSAVyrAtgKF7yPeCCkZ6GOEdXJmrRoabg1RF2eLlVidjlbH8qkiF3zKFddz1x4KmXLmBzgYUst0l9EEDWQe2IQA7';

    const mockPost: Post = {
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
        service.addPost$(mockPost, token).subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/posts`);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(mockPost);
        expect(JSON.stringify(req.request.headers)).toContain(token);
        expect(req.request.url).toEqual(`${environment.backend}/posts`);
        httpMock.verify();
    });

    it('service should allow to get posts', () => {
        service.getAllPosts$().subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/posts`);

        expect(req.request.method).toEqual('GET');
        expect(req.request.url).toEqual(`${environment.backend}/posts`);
        httpMock.verify();
    });

    it('service should allow to delete posts', () => {
        service.deletePost$(id, token).subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/posts/${id}`);

        expect(req.request.method).toEqual('DELETE');
        expect(JSON.stringify(req.request.headers)).toContain(token);
        expect(req.request.url).toEqual(`${environment.backend}/posts/${id}`);
        httpMock.verify();
    });
});