import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {catchError, Observable, throwError} from "rxjs";
import {Machine, MyError, ResponseMyErrors} from "../model";

@Injectable({
  providedIn: 'root'
})
export class MyErrorService {

  private readonly apiUrl = environment.managementErrorApi

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  getAllErrorsByUser(): Observable<ResponseMyErrors> {
    return this.httpClient.get<ResponseMyErrors>(`${this.apiUrl}`, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()}
    }).pipe(
      catchError(this.handleError)
    );
  }

  addError(textErr: string, machineId: number): Observable<MyError> {
    return this.httpClient.post<MyError>(`${this.apiUrl}`,{
      errorText: textErr,
      machineId: machineId
    }, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()},
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
