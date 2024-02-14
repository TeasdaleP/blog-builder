import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../interface/post.data";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {}

    /** Requires Auth Token */
    addPost$(payload: Post, token: string): Observable<any> {
        const headers = this.getHeaders(token);
        return this.http.post<any>(`${environment.backend}/posts`, payload, { headers });
    }

    getAllPosts$(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.backend}/posts`);
    }

    /** Requires Auth Token */
    deletePost$(id: string, token: string): Observable<any> {
        const headers = this.getHeaders(token);
        return this.http.delete<any>(`${environment.backend}/posts/${id}`, { headers });
    }

    private getHeaders(token: string): any {
        return new HttpHeaders().set('Bearer', token).set('Accept','application/json')
    }
}