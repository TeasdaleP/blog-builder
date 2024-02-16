import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Comment } from "../interface/comment.data";

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    
    constructor(private http: HttpClient) { }

    getPosts$(postId: string): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${environment.backend}/comments/${postId}`);
    }

    /** Requires Auth Token */
    addComment$(comment: Comment, token: string): Observable<any> {
        const headers = this.getHeaders(token);
        return this.http.post<any>(`${environment.backend}/comments`, comment, { headers })
    }

    private getHeaders(token: string): any {
        return new HttpHeaders().set('Bearer', token).set('Accept','application/json')
    }
}