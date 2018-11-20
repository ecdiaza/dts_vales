import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { HttpClient } from 'selenium-webdriver/http';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
/*import { HttpClient } from '@angular/common/http';*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  logIn(username: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form

    // Calls service to login user to the api rest
    let user: User = new User();
    user.name = username;
    user.document = username;
    user.password = password;
    this.loginService.login(user).subscribe(
      res => {
        /*let u: User = {name: username, password: password};*/
        this.userService.setUserLoggedIn(user);

      },
      error => {
        console.error(error);

      },
      () => this.navigate()
    );

  }

  navigate() {
    this.router.navigateByUrl('/home');
  }
}
