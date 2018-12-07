import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen: boolean;
  userPermission: string[];
  constructor() {
    this.userPermission = new Array();
    this.navbarOpen = true;
    this.userPermission = JSON.parse(localStorage.getItem('currentUserPermissions'));
  }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
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
