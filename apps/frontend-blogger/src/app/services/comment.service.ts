import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Auth } from "../interface/auth.data";
import { Comment } from "../interface/comment.data";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    
    constructor(private http: HttpClient) { }

    getPosts$(postId: string): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${environment.backend}/comments/${postId}`);
    }
}