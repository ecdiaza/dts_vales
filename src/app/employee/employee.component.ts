import { Component, OnInit } from '@angular/core';
import { EmployeeService} from './employee.service';
import { Employee} from '../model/employee.model';
import { UserService } from '../user/user.service';

import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  private sub: any;
  public employees: Employee[];
  // Pagination
  public employeesPage: Employee[];
  public currentPage: number;
  public pages: number[];
  public total: number;
  public numPages: number;
  public pageSize: number;
  public companyId: number;
  //
  // tslint:disable-next-line:max-line-length
  constructor( public employeeService: EmployeeService, private route: ActivatedRoute, private router: Router, private userService: UserService ) {
    // Pagination
    this.currentPage = 1;
    this.pages = new Array();
    this.pageSize = 5;
  }

  ngOnInit() {
    this.companyId = 0;
    this.sub = this.route.params.subscribe(params => {
      if ( params['id_empresa'] !== undefined ) {
        this.companyId = params['id_empresa'];
      } else {
        this.companyId = this.userService.getUserLoggedIn().companyId;
      }
      });
    this.getEmployees( this.companyId );
  }

  setPage(index: number) {
    this.currentPage = index;
    this.employeesPage = new Array();
    for (let i = (index - 1) * this.pageSize; ( i < index * this.pageSize ) && ( i < this.total ); i++) {
      this.employeesPage.push(this.employees[i]);
    }
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['/empleados/' + this.companyId]);
  }

  getEmployees(companyId: number) {
      this.employeeService.getEmployees(companyId).subscribe(data => {
      console.log(data);
      this.employees = JSON.parse(JSON.stringify(data));
      // Pagination
      this.total = this.employees.length;
      this.numPages = this.total / this.pageSize;
      for (let i = 0; i < this.numPages; i++) {
       this.pages.push(i + 1);
      }
      this.setPage(1);
    });
  }
}
