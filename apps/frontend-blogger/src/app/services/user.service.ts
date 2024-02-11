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
}