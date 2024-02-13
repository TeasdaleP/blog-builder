import { HttpClient } from "@angular/common/http";
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

    getUser$(id: string | undefined): Observable<User> {
        return this.http.get<User>(`${environment.backend}/users/${id}`);
    }

    getAllUser$(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.backend}/users`);
    }

    updateUser$(id: string | undefined, payload: User): Observable<User> {
        return this.http.patch<User>(`${environment.backend}/users/${id}`, payload);
    }

    deleteUsers$(id: string): Observable<any> {
        return this.http.delete<any>(`${environment.backend}/users/${id}`)
    }
}