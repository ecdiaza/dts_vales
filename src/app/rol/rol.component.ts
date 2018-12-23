import { Component, OnInit } from '@angular/core';
import {RolService} from './rol.service';
import {Rol} from '../model/rol.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  public roles: Rol[];
    // Pagination
    public rolesPage: Rol[];
    public currentPage: number;
    public pages: number[];
    public total: number;
    public numPages: number;
    public pageSize: number;
  constructor( public rolService: RolService) {
    // Pagination
    this.currentPage = 1;
    this.pages = new Array();
    this.pageSize = 5;
  }

  ngOnInit() {
    this.getRoles();
  }

  setPage(index: number) {
    this.currentPage = index;
    this.rolesPage = new Array();
    for (let i = (index - 1) * this.pageSize; ( i < index * this.pageSize ) && ( i < this.total ); i++) {
      this.rolesPage.push(this.roles[i]);
    }
  }

  deleteRol(id: number) {
    this.rolService.deleteRol(id).subscribe(data => {
      console.log(data);
    });
    window.location.href = './roles';
  }

  getRoles() {
      this.rolService.getRoles(0).subscribe(data => {
      console.log(data);
      this.roles = JSON.parse(JSON.stringify(data));
      // Pagination
      this.total = this.roles.length;
      this.numPages = this.total / this.pageSize;
      for (let i = 0; i < this.numPages; i++) {
        this.pages.push(i + 1);
      }
      this.setPage(1);
    });
  }

}
