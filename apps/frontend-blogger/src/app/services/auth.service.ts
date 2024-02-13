import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Auth } from "../interface/auth.data";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor(private http: HttpClient) { }

    login$(email: string, password: string): Observable<Auth> {
        const payload = { email: email, password: password };
        return this.http.post<Auth>(`${environment.backend}/auth/login`, payload);
    }
}