import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../model/rol.model';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable()
export class RolService {
  roles: any = [];
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/dts/api/rol/';
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl + 'table' + '?userId=1')
      .pipe(
        tap(roles => this.log(`fetched roles`)),
        catchError(this.handleError('getRoles', []))
      );
  }

  getRol(id: number): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl + 'rol' + '?userId=1&id=' + id)
      .pipe(
        tap(roles => this.log(`fetched rol`)),
        catchError(this.handleError('getRol', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('UserService: ' + message);
  }

}
