import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-editar',
  templateUrl: './employee-editar.component.html',
  styleUrls: ['./employee-editar.component.css']
})
export class EmployeeEditarComponent implements OnInit {
  private sub: any;
  public idEmployee: number;
  public employee: Employee;
  public activo: boolean;

  constructor(public employeeService: EmployeeService,  private route: ActivatedRoute) {
   }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idEmployee = params['id_empleado'];
      });

    this.getEmployee(this.idEmployee );

  }
  getEmployee(id: number) {
      this.employeeService.getEmployee(id).subscribe(data => {
      console.log(data);
      this.employee = JSON.parse(JSON.stringify(data[0]));
    });
  }

  updateEmployee(employee: Employee) {
    let userId: number;
    userId = 1;

    // Active Rol
    if ( this.activo ) {
      this.employee.locked = 'false';
    } else {
      this.employee.locked = 'true';
    }
    // Update
    this.employeeService.updateEmployee( employee, userId).subscribe(data => {
      console.log(data);
    });
  }
}
