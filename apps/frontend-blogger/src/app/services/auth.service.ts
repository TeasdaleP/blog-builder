import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Auth } from "../interface/auth.data";
import { User } from "../interface/user.interface";

export interface LoginHttpResponse {
    status: number;
    response: Auth | any;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: HttpClient) { }

    login$(email: string, password: string): Observable<LoginHttpResponse> {
        const payload = { email: email, password: password };
        return this.http.post<LoginHttpResponse>(`http://localhost:3000/auth/login`, payload);
    }

    register$(payload: User): Observable<any> {
        return this.http.post<User>(`http://localhost:3000/auth/register`, payload);
    }
}