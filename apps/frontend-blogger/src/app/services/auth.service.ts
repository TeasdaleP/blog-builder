import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Auth } from "../interface/auth.data";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: HttpClient) { }

    login$(email: string, password: string): Observable<Auth> {
        const payload = { email: email, password: password };
        return this.http.post<Auth>(`http://localhost:3000/auth/login`, payload);
    }
}