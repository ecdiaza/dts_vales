import { Component, OnInit } from '@angular/core';
import { UserService} from './user/user.service';
import { User } from './user/user.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RolService } from './rol/rol.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userLogged: boolean;
  userService: UserService;
  rolPermissionsUser: string[];
  user: User;
  authType: String;
  constructor(private route: ActivatedRoute, private router: Router, public rolService: RolService ) {
    this.userLogged = false;
    this.userService = new UserService();
    this.user = new User();
    this.rolPermissionsUser = new Array();
    if (this.user = this.userService.getUserLoggedIn()) {
      if (this.user.id >= 0 ) {
        this.userLogged = true;
        this.getRolPermissionsUser(this.user.id);
      } else {
        this.userLogged = false;
      }
    }
  }

  ngInit() {
    if ( this.userLogged ) {
      this.getRolPermissionsUser(this.user.id);
    }

    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
    });
    if (this.authType === 'logout') {
      this.userService.setUserLoggedOut();
    }
  }

  onLogout(event: Event): void {
    event.preventDefault();
    this.userService.setUserLoggedOut();
    this.userLogged = false;
    this.router.navigate(['/']);
  }

  getRolPermissionsUser(userId: number) {
    this.rolService.getRolPermissionsUser(userId).subscribe(data => {
      console.log(data);
      let total: number;
      total = JSON.parse(JSON.stringify(data['objects'])).length;
      for (let index = 0; index < total; index++) {
        this.rolPermissionsUser.push(JSON.parse(JSON.stringify(data['objects']))[index].name);
      }
      localStorage.setItem('currentUserPermissions', JSON.stringify(this.rolPermissionsUser));
    });
  }
}
