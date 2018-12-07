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
  constructor( public employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.getEmployees();
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
    });
  }

  getEmployees() {
      this.employeeService.getEmployees().subscribe(data => {
      console.log(data);
      this.employees = JSON.parse(JSON.stringify(data));
    });
  }
}
