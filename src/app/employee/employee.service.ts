import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Employee } from '../model/employee.model';
import { Permission } from '../model/permission.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable()
export class EmployeeService {
  employee: any = [];
  private apiUrl: string;
  user: User;
  userService: UserService;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/dts/api/employee/';
    this.userService = new UserService();
    this.user = this.userService.getUserLoggedIn();
  }

  getEmployees(companyId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'employees' + '?userId=' + this.user.id + '&companyId=' + companyId )
      .pipe(
        tap(employees => this.log(`fetched employees`)),
        catchError(this.handleError('getEmployee', []))
      );
  }

  getEmployee(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'employee' + '?userId=' + this.user.id + '&id=' + id)
      .pipe(
        tap(employees => this.log(`fetched employee`)),
        catchError(this.handleError('getEmployee', []))
      );
  }


  updateEmployee (employee: Employee): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': employee , 'userId': this.user.id });
    return this.http.post(this.apiUrl + 'update' + '?userId=' + this.user.id, params, httpOptions).pipe(
      tap(_ => this.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('error: updateEmployee'))
    );
  }

  insertEmployee (employee: Employee): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': employee , 'userId': this.user.id });
    return this.http.post(this.apiUrl + 'insert' + '?userId=' + this.user.id, params, httpOptions).pipe(
      tap(_ => this.log(`insert employee id=${employee.id}`)),
      catchError(this.handleError<any>('error: insertEmployee'))
    );
  }

  deleteEmployee (id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.apiUrl + 'delete' + '?userId=' + this.user.id + '&id=' + id, httpOptions).pipe(
      tap(_ => this.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('error: deleteEmployee'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('EmployeeService: ' + message);
  }

}
