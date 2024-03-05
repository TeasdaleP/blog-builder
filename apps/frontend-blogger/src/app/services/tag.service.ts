import { Injectable } from "@angular/core";
import { Tag } from "../interface/tag.data";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(private http: HttpClient) {}

    /** Requires Auth Token */
    addTag$(payload: Tag, token: string): Observable<any> {
        const headers = this.getHeaders(token);
        return this.http.post<any>(`${environment.backend}/tag`, payload, { headers });
    }

    getAllTags$(): Observable<Tag[]> {
        return this.http.get<Tag[]>(`${environment.backend}/tag`);
    }

    private getHeaders(token: string): any {
        return new HttpHeaders().set('Bearer', token).set('Accept','application/json')
    }
}