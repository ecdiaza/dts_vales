import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Vale } from '../model/vale.model';
import { Permission } from '../model/permission.model';

import { RolService } from '../rol/rol.service';
import { ValeService } from '../vale/vale.service';
import { UserService } from '../user/user.service';
import { AgreementService } from '../agreement/agreement.service';
import { ClientCompany } from '../model/client-company.model';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-vale-editar',
  templateUrl: './vale-editar.component.html',
  styleUrls: ['./vale-editar.component.css']
})
export class ValeEditarComponent implements OnInit {

  public sections = ['EmpresaTaxi', 'EmpresaCliente'];
  private sub: any;
  public vale: Vale;
  public description: string;
  public listClientCompanies: ClientCompany[];
  public employee: Employee;
  public userCompanyId: number;

  // tslint:disable-next-line:max-line-length
  constructor(public valeService: ValeService, private route: ActivatedRoute, private userService: UserService, private agreementService: AgreementService) {
    this.vale = new Vale();
    this.employee = new Employee();
    this.employee.names = '';
    this.userCompanyId = this.userService.getUserLoggedIn().companyId;
  }
  ngOnInit() {
    this.vale.esTercero = 'false';
    this.getListClienCompanies();
  }

  getListClienCompanies() {
    this.valeService.getClientCompanies().subscribe(data => {
      console.log(data);
      this.listClientCompanies = JSON.parse(JSON.stringify(data));
    });
  }

  setEstercero(value: string ) {
    this.vale.esTercero = value;
  }

  getEmpleado() {
    if (this.vale.esTercero === 'false') {
      this.valeService.getEmpleado(this.vale.numeroDocumento).subscribe(data => {
        console.log(data);
        this.employee = JSON.parse(JSON.stringify(data[0]));
      });
    }
  }

  saveVale(vale: Vale) {
   // this.vale.fechaHora =  Date.parse(this.vale.fechaHora).toString();
    this.vale.idEmpleadoBeneficiario = this.employee.id;
    this.vale.idEmpleadoSolicitante = this.userCompanyId;
    if ( this.vale.esTercero === 'false') {
      this.vale.nombrePasajero = this.employee.names + ' ' + this.employee.lastNames;
    }
    this.agreementService.getAgreement(this.userCompanyId, this.employee.id).subscribe(data => {
      console.log(data);
      this.vale.idConvenio = JSON.parse(JSON.stringify(data[0])).id;
      // validacion tipo Vale
    });
    this.vale.estado = 'Solicitado';
   // this.vale.idConvenio = this.agreementService.getAgreement(this.userCompanyId, this.employee.id)[0].id;
    /*if (this.vale.id > 0) {
      // Update
      this.rolService.updateRol( rol, listIdPermisions).subscribe(data => {
        console.log(data);
      });
    } else {
      */
      // Insert
      this.valeService.insertVale(vale).subscribe(data => {
        console.log(data);
      });

    // }
    window.location.href = './vales';
}

}
