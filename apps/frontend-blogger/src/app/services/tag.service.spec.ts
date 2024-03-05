import { HttpClient } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Tag } from "../interface/tag.data";
import { TagService } from "./tag.service";
import { environment } from "../../environments/environment";

describe('Tag Service', () => {
    let service: TagService;
    let result;

    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    const id = '9ec04e53-d82a-452e-835d-dfc471f94bb1';
    const token = '5s7xx1gkUP8JeSAVyrAtgKF7yPeCCkZ6GOEdXJmrRoabg1RF2eLlVidjlbH8qkiF3zKFddz1x4KmXLmBzgYUst0l9EEDWQe2IQA7';

    const mockTag: Tag = {
        name: 'Blogging'
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TagService]
        });

        service = TestBed.inject(TagService);
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
    });

    it('service should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to add a new tag', () => {
        service.addTag$(mockTag, token).subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/tag`);

        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(mockTag);
        expect(JSON.stringify(req.request.headers)).toContain(token);
        expect(req.request.url).toEqual(`${environment.backend}/tag`);
        httpMock.verify();
    });

    it('should be able to get all tags', () => {
        service.getAllTags$().subscribe((any) => result = any);
        const req = httpMock.expectOne(`${environment.backend}/tag`);

        expect(req.request.method).toEqual('GET');
        expect(req.request.url).toEqual(`${environment.backend}/tag`);
        httpMock.verify();
    });
});