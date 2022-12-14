import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import { ResponseAllUsers, ResponseCreateUser, ResponseLogin, User} from "../model";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private readonly apiUrl = environment.userManagementApi
  private readonly loginUrl = 'http://localhost:8080/auth/login'

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  getAllUsers(): Observable<ResponseAllUsers> {
    return this.httpClient.get<ResponseAllUsers>(`${this.apiUrl + 'all'}`, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()}
    }).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}${userId}`, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()}
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUserById(userId: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}${userId}`, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()}
    }).pipe(
      catchError(this.handleError)
    );
  }

  createNewUser(firstName: string, lastName: string, username: string, password: string, roles: String[]): Observable<ResponseCreateUser> {
    return this.httpClient.post<ResponseCreateUser>(`${this.apiUrl}`,{
      username: username,
      firstName:firstName,
      lastName:lastName,
      password: password,
      roles: roles
    }, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()},
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userId:number, firstName: string, lastName: string, username: string, roles: String[]): Observable<ResponseCreateUser> {
    return this.httpClient.put<ResponseCreateUser>(`${this.apiUrl}`,{
      userId: userId,
      username: username,
      firstName:firstName,
      lastName:lastName,
      roles: roles
    }, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()},
    }).pipe(
      catchError(this.handleError)
    );
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
    return throwError(() => new Error(error.error));
  }
}
