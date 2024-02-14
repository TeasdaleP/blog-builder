import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interface/user.interface";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    register$(payload: User): Observable<any> {
        return this.http.post<User>(`${environment.backend}/users`, payload);
    }

    /** Requires Auth Token */
    getUser$(id: string | undefined, token: string): Observable<User> {
        const headers = this.getHeaders(token);
        return this.http.get<User>(`${environment.backend}/users/${id}`, { headers });
    }

    /** Requires Auth Token */
    getAllUser$(token: string): Observable<User[]> {
        const headers = this.getHeaders(token);
        return this.http.get<User[]>(`${environment.backend}/users`, { headers });
    }

    /** Requires Auth Token */
    updateUser$(id: string | undefined, payload: User, token: string): Observable<User> {
        const headers = this.getHeaders(token);
        return this.http.patch<User>(`${environment.backend}/users/${id}`, payload, { headers });
    }

    /** Requires Auth Token */
    deleteUsers$(id: string, token: string): Observable<any> {
        const headers = this.getHeaders(token);
        return this.http.delete<any>(`${environment.backend}/users/${id}`, { headers })
    }

    private getHeaders(token: string): any {
        return new HttpHeaders().set('Bearer', token).set('Accept','application/json')
    }
}