import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { RolService} from '../rol/rol.service';
import { Rol} from '../model/rol.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-editar',
  templateUrl: './employee-editar.component.html',
  styleUrls: ['./employee-editar.component.css']
})

export class EmployeeEditarComponent implements OnInit {
  private sub: any;
  public employeeId: number;
  public employee: Employee;
  public activo: boolean;
  public documentsType = ['CC', 'CE' , 'NIT'];
  public companyId: number;
  public roles: Rol[];
  // tslint:disable-next-line:max-line-length
  constructor(public employeeService: EmployeeService,  private route: ActivatedRoute, private router: Router, private rolService: RolService) {
    this.activo = false;
    this.employeeId = 0;
    this.employee = new Employee();
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id_empleado'] !== undefined) {
        this.employeeId = params['id_empleado'];
      }
      if (params['id_empresa'] !== undefined) {
        this.companyId = params['id_empresa'];
      }
      });
      if (this.employeeId > 0 ) {
        this.getEmployee(this.employeeId);
      }
      this.getRoles(this.companyId);
  }

  getEmployee(id: number) {
    if ( id > 0 ) {
      this.employeeService.getEmployee(id).subscribe(data => {
      console.log(data);
      this.employee = JSON.parse(JSON.stringify(data[0]));
      // Active
      if ( this.employee.locked === 'true' ) {
        this.activo = false;
      } else {
        this.activo = true;
      }
    });
    } else {
      this.employee = new Employee();
      this.employee.id = 0;
    }
  }

  getRoles(companyId: number) {
    this.rolService.getRoles(companyId).subscribe(data => {
      console.log(data);
      this.roles = JSON.parse(JSON.stringify(data));
    });
  }

  saveEmployee(employee: Employee) {
    // Active
    if ( this.activo ) {
      this.employee.locked = 'false';
    } else {
      this.employee.locked = 'true';
    }
    employee.companyId = this.companyId;

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
    // window.location.href = './empleados/' + this.companyId;
    this.router.navigate(['/empleados/' + this.companyId]);

  }
}
