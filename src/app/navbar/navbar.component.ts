import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen: boolean;
  userPermission: string[];
  user: User;
  constructor( private router: Router, private userService: UserService) {
    this.userPermission = new Array();
    this.user = new User();
    this.navbarOpen = true;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userPermission = JSON.parse(localStorage.getItem('currentUserPermissions'));
  }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  goEmployees() {
   // this.router.navigate(['/empleados', this.user.companyId]);
   this.router.navigate(['/empleados/' + this.user.companyId]);

  }

  getPermission(item: string) {
    let valid: Boolean;
    valid = false;
    for (let index = 0; index < this.userPermission.length; index++) {
      if (this.userPermission[index] === item) {
        valid = true;
        break;
      }
    }
    return valid;
  }
}
