import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Employee } from '../model/employee.model';
import { Permission } from '../model/permission.model';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable()
export class EmployeeService {
  employee: any = [];
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/dts/api/employee/';
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'employees' + '?userId=1')
      .pipe(
        tap(employees => this.log(`fetched employees`)),
        catchError(this.handleError('getEmployee', []))
      );
  }

  getEmployee(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl + 'employee' + '?userId=1&id=' + id)
      .pipe(
        tap(employees => this.log(`fetched employee`)),
        catchError(this.handleError('getEmployee', []))
      );
  }


  updateEmployee (employee: Employee, userId: number): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': employee , 'userId': userId });
    return this.http.post(this.apiUrl + 'update' + '?userId=1', params, httpOptions).pipe(
      tap(_ => this.log(`updated employee id=${employee.id}`)),
      catchError(this.handleError<any>('error: updateEmployee'))
    );
  }

  deleteEmployee (id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.apiUrl + 'delete' + '?userId=1&id=' + id, httpOptions).pipe(
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
