import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ClientCompany } from '../model/client-company.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable()
export class ClientCompanyService {
  clientCompany: any = [];
  private apiUrl: string;
  user: User;
  userService: UserService;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/dts/api/clientcompany/';
    this.userService = new UserService();
    this.user = this.userService.getUserLoggedIn();
  }

  getClientCompanies(): Observable<ClientCompany[]> {
    return this.http.get<ClientCompany[]>(this.apiUrl + 'companies' + '?userId=' + this.user.id)
      .pipe(
        tap(clientCompanies => this.log(`fetched Client Companies`)),
        catchError(this.handleError('getClientCompanies', []))
      );
  }

  getClientCompany(id: number): Observable<ClientCompany[]> {
    return this.http.get<ClientCompany[]>(this.apiUrl + 'company' + '?userId=' + this.user.id + '&id=' + id)
      .pipe(
        tap(clientCompany => this.log(`fetched Client Company`)),
        catchError(this.handleError('getClientCompany', []))
      );
  }


  updateClientCompany (clientCompany: ClientCompany): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': clientCompany , 'userId': this.user.id });
    return this.http.post(this.apiUrl + 'update' + '?userId=' + this.user.id, params, httpOptions).pipe(
      tap(_ => this.log(`updated clientCompany id=${clientCompany.id}`)),
      catchError(this.handleError<any>('error: updateClientCompany'))
    );
  }

  insertClientCompany (clientCompany: ClientCompany): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': clientCompany , 'userId': this.user.id });
    return this.http.post(this.apiUrl + 'insert' + '?userId=' + this.user.id, params, httpOptions).pipe(
      tap(_ => this.log(`insert clientCompany id=${clientCompany.id}`)),
      catchError(this.handleError<any>('error: insertClientCompany'))
    );
  }

  deleteClientCompany (id: number): Observable<ClientCompany> {
    return this.http.delete<ClientCompany>(this.apiUrl + 'delete' + '?userId=' + this.user.id + '&id=' + id, httpOptions).pipe(
      tap(_ => this.log(`deleted clientCompany id=${id}`)),
      catchError(this.handleError<ClientCompany>('error: deleteClientCompany'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('ClientCompanyService: ' + message);
  }

}
