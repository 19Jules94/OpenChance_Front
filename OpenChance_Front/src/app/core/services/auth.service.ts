import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreatedUserResult } from "../models/auth/created-user-result";

@Injectable({
    providedIn : 'root'
})

export class AuthService{

    private apiUrl = "https://localhost:7189/api/Auth";

    constructor(private http:HttpClient){}

    signup(data : any){
        return this.http.post<CreatedUserResult>(`${this.apiUrl}/register`, data)
    }

    login(data : any){
        return this.http.post(`${this.apiUrl}/login`, data)
    }
}
