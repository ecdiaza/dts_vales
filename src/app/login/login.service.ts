import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(user: User) {

    let json = JSON.stringify(user);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  /*  let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basic });
  let options = { headers: headers };
  */
    /*
    return this._http.post(this.api_url + 'auth', json, {headers: headers})
      .map(res => res.json());
  }*/
    return this.http.post('http://localhost:8080/dts/api/user/auth', json, {headers: headers});

    /*.map(res => res.json());
    /*return this.http.post('http://localhost:8080/dts/api/auth', {
      email: username,
      password: password,
    });*/
  }



}
