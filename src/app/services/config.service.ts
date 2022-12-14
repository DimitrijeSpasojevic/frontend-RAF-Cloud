import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

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

  canUserCreate(): boolean{
    let decodedToken = jwt_decode(this.token);
    // @ts-ignore
    for (let i = 0; i < decodedToken.roles.length; i++) {
      // @ts-ignore
      if(decodedToken.roles[i].role == "can_create_users")
        return true;
    }
    return false;
  }

  canUserDelete(): boolean{
    let decodedToken = jwt_decode(this.token);
    // @ts-ignore
    for (let i = 0; i < decodedToken.roles.length; i++) {
      // @ts-ignore
      if(decodedToken.roles[i].role == "can_delete_users")
        return true;
    }
    return false;
  }

  setToken(token: string): void{
    this.token = token
    localStorage.setItem("token",this.token)
  }
}
