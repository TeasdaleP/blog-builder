import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../interface/post.data";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {}

    addPost$(payload: Post): Observable<any> {
        return this.http.post<any>(`${environment.backend}/posts`, payload);
    }

    getAllPosts$(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.backend}/posts`);
    }

    deletePost$(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.backend}/posts/${id}`);
    }
}