import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Agreement } from '../model/agreement.model';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable()
export class AgreementService {
  agreement: any = [];
  private apiUrl: string;
  user: User;
  userService: UserService;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/dts/api/agreement/';
    this.userService = new UserService();
    this.user = this.userService.getUserLoggedIn();
  }

  getAgreements(companyId: number): Observable<Agreement[]> {
    return this.http.get<Agreement[]>(this.apiUrl + 'agreements' + '?userId=' + this.user.id + '&companyId=' + companyId )
      .pipe(
        tap(agreements => this.log(`fetched agreements`)),
        catchError(this.handleError('getagreement', []))
      );
  }

  getAgreement(taxiCompanyId: number, clientCompanyId: number): Observable<Agreement[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<Agreement[]>(this.apiUrl + 'agreement' + '?userId=' + this.user.id + '&taxiCompanyId=' + taxiCompanyId + '&clientCompanyId=' + clientCompanyId)
      .pipe(
        tap(agreements => this.log(`fetched agreement`)),
        catchError(this.handleError('getagreement', []))
      );
  }


  updateAgreement (agreement: Agreement): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': agreement , 'userId': this.user.id });
    return this.http.post(this.apiUrl + 'update' + '?userId=' + this.user.id, params, httpOptions).pipe(
      tap(_ => this.log(`updated agreement id=${agreement.id}`)),
      catchError(this.handleError<any>('error: updateagreement'))
    );
  }

  insertAgreement (agreement: Agreement): Observable<null> {
    let params: String;
    params = JSON.stringify({ 'object': agreement , 'userId': this.user.id });
    return this.http.post(this.apiUrl + 'insert' + '?userId=' + this.user.id, params, httpOptions).pipe(
      tap(_ => this.log(`insert agreement id=${agreement.id}`)),
      catchError(this.handleError<any>('error: insertagreement'))
    );
  }

  deleteAgreement (id: number): Observable<Agreement> {
    return this.http.delete<Agreement>(this.apiUrl + 'delete' + '?userId=' + this.user.id + '&id=' + id, httpOptions).pipe(
      tap(_ => this.log(`deleted agreement id=${id}`)),
      catchError(this.handleError<Agreement>('error: deleteagreement'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('agreementService: ' + message);
  }

}
