import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../interface/post.data";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {}

    addPost$(payload: Post): Observable<any> {
        return this.http.post<any>(`http://localhost:3000/posts`, payload);
    }

    getAllPosts$(): Observable<Post[]> {
        return this.http.get<Post[]>(`http://localhost:3000/posts`);
    }

    deletePost$(id: string): Observable<any> {
        return this.http.delete<any>(`http://localhost:3000/posts/${id}`)
    }
}