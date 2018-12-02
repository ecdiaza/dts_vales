import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { HttpClient } from 'selenium-webdriver/http';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {
  public user: User;
  constructor(private loginService: LoginService, private router: Router, private userService: UserService) {
    this.user = new User();

    if (this.user = this.userService.getUserLoggedIn()) {
      if (this.user.id >= 0 ) {
        this.router.navigate(['**']);
      }
    }
  }

  ngOnInit() {

  }

  logIn(username: string, password: string, event: Event) {
    event.preventDefault();
    let userSending: User = new User();
    userSending.name = username;
    userSending.document = username;
    userSending.password = password;

    this.loginService.login(userSending).subscribe(data => {
      console.log(data);
      // this.user =  JSON.parse(JSON.stringify(data['user']));
      let user: User;
      user = new User();
      user.id = Number(JSON.parse(JSON.stringify(data['user'])).id);
      user.name = String(JSON.parse(JSON.stringify(data['user'])).name);
      user.document = String(JSON.parse(JSON.stringify(data['user'])).document);
      this.userService.setUserLoggedIn(user);
      let a: number;
      a = 1;

      this.router.navigateByUrl('/');
      window.location.reload();
    });
  }
}
