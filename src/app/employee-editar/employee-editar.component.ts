import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  public documentsType = ['CC', 'CE' , 'NIT'];

  constructor(public employeeService: EmployeeService,  private route: ActivatedRoute, private router: Router) {
    this.activo = false;
    this.idEmployee = 0;
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idEmployee = params['id_empleado'];
      });
      this.getEmployee(this.idEmployee);
  }

  getEmployee(id: number) {
    if ( id > 0 ) {
      this.employeeService.getEmployee(id).subscribe(data => {
      console.log(data);
      this.employee = JSON.parse(JSON.stringify(data[0]));
    });
    } else {
      this.employee = new Employee();
      this.employee.id = 0;
    }
  }

  saveEmployee(employee: Employee) {
    // Active Rol
    if ( this.activo ) {
      this.employee.locked = 'false';
    } else {
      this.employee.locked = 'true';
    }
    if ( this.employee.id > 0 ) {
      // Update
      this.employeeService.updateEmployee(employee).subscribe(data => {
        console.log(data);
      });
    } else {
      // Insert
      this.employeeService.insertEmployee(employee).subscribe(data => {
        console.log(data);
      });
    }
    window.location.href = './empleados';
  }
}
