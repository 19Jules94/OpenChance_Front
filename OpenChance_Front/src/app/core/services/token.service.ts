import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class TokenService {
  private accessToken: string | null = null;
  constructor (){}

  setAccessToken(data:any){
    this.accessToken = data;
  }

  getAccessToken(){
    return this.accessToken;
  }

  clear(){
    this.accessToken = null;
  }
}
