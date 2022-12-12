import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {ResponseAllUsers, ResponseLogin} from "../model";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private readonly apiUrl = environment.userManagementApi + 'all'
  private readonly loginUrl = 'http://localhost:8080/auth/login'

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  getAllUsers(): Observable<ResponseAllUsers> {
    return this.httpClient.get<ResponseAllUsers>(`${this.apiUrl}`, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()}
    });
  }

  login(email: string, password: string): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(this.loginUrl, {
      username: email,
      password: password
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKK")

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
