import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";
import {ConfigService} from "./services/config.service";

@Injectable({
  providedIn: 'root'
})
export class ReadAuthGuard implements CanActivate {

  constructor(private router: Router, private configService: ConfigService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let decodedToken = jwt_decode(this.configService.getToken());
    // @ts-ignore
    for (let i = 0; i < decodedToken.roles.length; i++) {
      // @ts-ignore
      if(decodedToken.roles[i].role == "can_read_users")
        return true;
    }

    return false;
  }
}
