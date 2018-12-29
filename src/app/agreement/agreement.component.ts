import { Component, OnInit } from '@angular/core';
import { Agreement } from '../model/agreement.model';
import { AgreementService} from '../agreement/agreement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCompany } from '../model/client-company.model';
import { UserService } from '../user/user.service';
import { ClientCompanyService } from '../client-company/client-company.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})

export class AgreementComponent implements OnInit {
  private sub: any;
  public agreementId: number;
  public agreement: Agreement;

  public activo: boolean;
  public isEspecial: boolean;
  public isSurcharge: boolean;

  public userCompanyId: number;
  public clientCompanyId: number;
  public clientCompany: ClientCompany;
  // tslint:disable-next-line:max-line-length
  constructor(public agreementService: AgreementService,  private route: ActivatedRoute, private router: Router, private userService: UserService, private clientCompanyService: ClientCompanyService) {
    this.activo = false;
    this.agreementId = 0;
    this.agreement = new Agreement();
    this.clientCompany = new ClientCompany();
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id_empresa'] !== undefined) {
        this.clientCompanyId = params['id_empresa'];
      }
      this.userCompanyId = this.userService.getUserLoggedIn().companyId;
      });

    this.clientCompanyService.getClientCompany(this.clientCompanyId).subscribe(data => {
        console.log(data);
        this.clientCompany = JSON.parse(JSON.stringify(data[0]));
        this.clientCompanyId = this.clientCompany.id;
      });
    this.getagreement(this.userCompanyId, this.clientCompanyId);
  }

  getagreement(userCompanyId: number, clientCompanyId: number) {
      this.agreementService.getAgreement(userCompanyId, clientCompanyId).subscribe(data => {
      console.log(data);
      this.agreement = JSON.parse(JSON.stringify(data[0]));
      // Active
      if ( this.agreement.locked === 'true' ) {
        this.activo = false;
      } else {
        this.activo = true;
      }
          // IsEspecial
    if ( this.agreement.isEspecial === 'true') {
      this.isEspecial = true;
    } else {
      this.isEspecial = false;
    }
    // IsSurcharge
    if ( this.agreement.isSurcharge  === 'true') {
      this.isSurcharge = true;
    } else {
      this.isSurcharge = false;
    }
    });

    if (this.agreement.id = undefined) {
      this.agreement = new Agreement();
      this.agreement.id = 0;
    }
  }

  saveAgreement(agreement: Agreement) {
    // Active
    if ( this.activo ) {
      this.agreement.locked = 'false';
    } else {
      this.agreement.locked = 'true';
    }
    // IsEspecial
    if ( this.isEspecial ) {
      this.agreement.isEspecial = 'true';
    } else {
      this.agreement.isEspecial = 'false';
    }
    // IsSurcharge
    if ( this.isSurcharge ) {
      this.agreement.isSurcharge = 'true';
    } else {
      this.agreement.isSurcharge = 'false';
    }
    this.agreement.clientCompanyId = this.clientCompany.id;
    this.agreement.taxiCompanyId = this.userService.getUserLoggedIn().companyId;
    if ( this.agreement.id > 0 ) {
      // Update
      this.agreementService.updateAgreement(agreement).subscribe(data => {
        console.log(data);
      });
    } else {
      // Insert
      this.agreementService.insertAgreement(agreement).subscribe(data => {
        console.log(data);
      });
    }
    // window.location.href = './empresasCliente/';
    this.router.navigate(['/empresasCliente/']);

  }
}
