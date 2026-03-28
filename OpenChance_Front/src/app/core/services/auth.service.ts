import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreatedUserResult } from "../models/auth/created-user-result";
import { TokenService } from "./token.service";
import { tap } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class AuthService{
  
    private apiUrl = "https://localhost:7189/api/Auth";

    constructor(private http:HttpClient,private tokenService:TokenService){}

    signup(data : any){
        return this.http.post<CreatedUserResult>(`${this.apiUrl}/register`, data)
    }

    login(data: any){
    return this.http.post<{accessToken:string}>(`${this.apiUrl}/login`, data, {withCredentials:true})
    .pipe(
        tap(res => {
        console.log("TOKEN LOGIN:", res.accessToken);
        this.tokenService.setAccessToken(res.accessToken);
        })
    )
    }
    testInterceptor(){
        return this.http.get(`${this.apiUrl}/isAlive`);
        
    }
    refreshToken(){
        return this.http.post<{access_token:string}>(`${this.apiUrl}/refreshToken`, {},{withCredentials : true})
        .pipe(tap(res => this.tokenService.setAccessToken(res.access_token)))
            
    }
}
