import { HttpClient } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { CommentService } from "./comment.service";
import { Comment } from "../interface/comment.data";
import { environment } from "../../environments/environment";


describe('Comment Service', () => {
    let service: CommentService;
    let result;

    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    const id = '9ec04e53-d82a-452e-835d-dfc471f94bb1';
    const token = '5s7xx1gkUP8JeSAVyrAtgKF7yPeCCkZ6GOEdXJmrRoabg1RF2eLlVidjlbH8qkiF3zKFddz1x4KmXLmBzgYUst0l9EEDWQe2IQA7';

    const mockComment: Comment = {
        id: id,
        date: new Date(),
        author: 'author',
        comment: 'this is my comment, its amazing'
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CommentService]
        });

        service = TestBed.inject(CommentService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    it('service should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should allow logged in users to create comments with use of a token', () => {
        service.addComment$(mockComment, token).subscribe((any) => result = any);
        const mock = httpMock.expectOne(`${environment.backend}/comments`);

        expect(mock.request.method).toBe('POST');
        expect(mock.request.body).toBe(mockComment);
        expect(JSON.stringify(mock.request.headers)).toContain(token);
        expect(mock.request.url).toEqual(`${environment.backend}/comments`);
        httpMock.verify();
    });

    it('should allow any visitor to get all the comment for a specfic post', () => {
        service.getPosts$(id).subscribe((any) => result = any);
        const mock = httpMock.expectOne(`${environment.backend}/comments/${id}`);

        expect(mock.request.method).toBe('GET');
        expect(mock.request.body).toBeNull();
        expect(JSON.stringify(mock.request.headers)).not.toContain(token);
        expect(mock.request.url).toBe(`${environment.backend}/comments/${id}`);
    });
});