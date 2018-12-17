import { Component, OnInit } from '@angular/core';
import { EmployeeService} from './employee.service';
import { Employee} from '../model/employee.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees: Employee[];
  // Pagination
  public employeesPage: Employee[];
  public currentPage: number;
  public pages: number[];
  public total: number;
  public numPages: number;
  public pageSize: number;
  //
  constructor( public employeeService: EmployeeService) {
    // Pagination
    this.currentPage = 1;
    this.pages = new Array();
    this.pageSize = 5;
  }

  ngOnInit() {
    this.getEmployees();
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
    window.location.href = './empleados';
  }

  getEmployees() {
      this.employeeService.getEmployees().subscribe(data => {
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
