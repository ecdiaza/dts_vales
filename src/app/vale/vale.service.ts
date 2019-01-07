import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Vale } from '../model/vale.model';
import { Permission } from '../model/permission.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { ClientCompany } from '../model/client-company.model';
import { Employee } from '../model/employee.model';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable()
export class ValeService {
  roles: any = [];
  private apiUrl: string;
  user: User;
  userService: UserService;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/dts/api/vale/';
    this.userService = new UserService();
    this.user = this.userService.getUserLoggedIn();
  }

  getClientCompanies(): Observable<ClientCompany[]> {
    return this.http.get<ClientCompany[]>(this.apiUrl + 'clientcompanies' + '?userId=' + this.user.id)
      .pipe(
        tap(vales => this.log(`fetched client companies`)),
        catchError(this.handleError('getClientCompanies', []))
      );
  }

  getVales(): Observable<Vale[]> {
    return this.http.get<Vale[]>(this.apiUrl + 'vales' + '?userId=' + this.user.id)
      .pipe(
        tap(vales => this.log(`fetched Vales`)),
        catchError(this.handleError('getVales', []))
      );
  }

  getEmpleado(documentNumber: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'employee' + '?userId=' + this.user.id + '&documentNumber=' + documentNumber)
      .pipe(
        tap(roles => this.log(`fetched employee`)),
        catchError(this.handleError('getEmployee', []))
      );
  }

  insertVale (vale: Vale): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': vale , 'userId': this.user.id});
    return this.http.post(this.apiUrl + 'insert' + '?userId=' + this.user.id , params, httpOptions).pipe(
      tap(_ => this.log(`insert vale id=${vale.id}`)),
      catchError(this.handleError<any>('error: insertVale'))
    );
  }

  deleteRol (id: number): Observable<Vale> {
    return this.http.delete<Vale>(this.apiUrl + 'delete' + '?userId=1&id=' + id, httpOptions).pipe(
      tap(_ => this.log(`deleted vale id=${id}`)),
      catchError(this.handleError<Vale>('error: deleteVale'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('RolService: ' + message);
  }

}
