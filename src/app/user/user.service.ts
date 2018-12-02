import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  public userLogged: User;

  constructor() {
    this.isUserLoggedIn = false;
  }

  public setUserLoggedIn(user: User) {
    this.isUserLoggedIn = true;
    this.userLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getUserLoggedIn(): User {
    if ( localStorage.getItem('currentUser') === '') {
      let user = new User();
      return user;
    }
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public setUserLoggedOut() {
    this.isUserLoggedIn = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserPermissions');
    window.localStorage.clear();
  }
}
