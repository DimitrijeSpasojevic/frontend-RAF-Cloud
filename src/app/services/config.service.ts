import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private token: string;

  constructor() {
    if(localStorage.getItem("token") != null){
      // @ts-ignore
      this.token = localStorage.getItem("token")
    }else {
      this.token = '';
    }
  }

  getToken(): string {
    return this.token;
  }

  setToken(token: string): void{
    this.token = token
    localStorage.setItem("token",this.token)
  }
}
