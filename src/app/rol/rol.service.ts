import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Rol } from '../model/rol.model';
import { Permission } from '../model/permission.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable()
export class RolService {
  roles: any = [];
  private apiUrl: string;
  user: User;
  userService: UserService;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/dts/api/rol/';
    this.userService = new UserService();
    this.user = this.userService.getUserLoggedIn();
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl + 'roles' + '?userId=' + this.user.id)
      .pipe(
        tap(roles => this.log(`fetched roles`)),
        catchError(this.handleError('getRoles', []))
      );
  }

  getRol(id: number): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl + 'rol' + '?userId=' + this.user.id + '&id=' + id)
      .pipe(
        tap(roles => this.log(`fetched rol`)),
        catchError(this.handleError('getRol', []))
      );
  }

  getAllPermissions(id: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.apiUrl + 'rolpermissions' + '?userId=' + this.user.id + '&id=' + id)
      .pipe(
        tap(permissions => this.log(`fetched permissions`)),
        catchError(this.handleError('getAllPermissions', []))
      );
  }

  getRolPermissionsUser(UserId: number): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl + 'rolpermissionsuser' + '?userId=' + UserId)
      .pipe(
        tap(permissions => this.log(`fetched ro permissions user`)),
        catchError(this.handleError('getRolPermissionsUser', []))
      );
  }

  updateRol (rol: Rol, listPermissions: number[]): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': rol , 'userId': this.user.id, 'permissions': listPermissions });
    return this.http.post(this.apiUrl + 'update' + '?userId=1', params, httpOptions).pipe(
      tap(_ => this.log(`updated rol id=${rol.id}`)),
      catchError(this.handleError<any>('error: updateRol'))
    );
  }

  insertRol (rol: Rol, listPermissions: number[]): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': rol , 'userId': this.user.id, 'permissions': listPermissions });
    return this.http.post(this.apiUrl + 'insert' + '?userId=' + this.user.id , params, httpOptions).pipe(
      tap(_ => this.log(`insert rol id=${rol.id}`)),
      catchError(this.handleError<any>('error: insertRol'))
    );
  }

  deleteRol (id: number): Observable<Rol> {
    return this.http.delete<Rol>(this.apiUrl + 'delete' + '?userId=1&id=' + id, httpOptions).pipe(
      tap(_ => this.log(`deleted rol id=${id}`)),
      catchError(this.handleError<Rol>('error: deleteRol'))
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
