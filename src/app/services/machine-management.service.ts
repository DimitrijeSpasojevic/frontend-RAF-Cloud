import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {catchError, Observable, throwError} from "rxjs";
import {Machine, ResponseAllMachines, ResponseAllUsers, ResponseCreateUser} from "../model";

@Injectable({
  providedIn: 'root'
})
export class MachineManagementService {

  private readonly apiUrl = environment.managementMachinesApi

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  getAllMachines(): Observable<Machine[]> {
    return this.httpClient.get<Machine[]>(`${this.apiUrl + '/createdByLoggedUser'}`, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()}
    }).pipe(
      catchError(this.handleError)
    );
  }

  createMachine(name: string): Observable<Machine> {
    return this.httpClient.post<Machine>(`${this.apiUrl}`,{
      name: name
    }, {
      headers: {'Authorization':'Bearer ' + this.configService.getToken()},
    }).pipe(
      catchError(this.handleError)
    );
  }

  startMachine(machineId: number): Observable<string> {
    return this.httpClient.put<string>(`${this.apiUrl + '/start/' + machineId}`, {

    },{
      headers: {'Authorization':'Bearer ' + this.configService.getToken()}
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
