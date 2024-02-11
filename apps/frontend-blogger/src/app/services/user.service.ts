import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interface/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    register$(payload: User): Observable<any> {
        return this.http.post<User>(`http://localhost:3000/users`, payload);
    }

    getUser$(id: string | undefined): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/users/${id}`);
    }

    getAllUser$(): Observable<User[]> {
        return this.http.get<User[]>(`http://localhost:3000/users`);
    }

    updateUser$(id: string | undefined, payload: User): Observable<User> {
        return this.http.patch<User>(`http://localhost:3000/users/${id}`, payload);
    }

    deleteUsers$(id: string): Observable<any> {
        return this.http.delete<any>(`http://localhost:3000/users/${id}`)
    }
}