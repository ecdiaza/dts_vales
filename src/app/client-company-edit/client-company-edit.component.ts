import { Component, OnInit } from '@angular/core';
import { ClientCompanyService } from '../client-company/client-company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCompany } from '../model/client-company.model';

@Component({
  selector: 'app-client-company-edit',
  templateUrl: './client-company-edit.component.html',
  styleUrls: ['./client-company-edit.component.css']
})
export class ClientCompanyEditComponent implements OnInit {
  private sub: any;
  public idclientCompany: number;
  public clientCompany: ClientCompany;
  public active: boolean;
  public isTaxiCompany: boolean;
  public ownNetwork: boolean;
  public synergy: boolean;
  public userCompanyIsClientCompany: string;

  constructor(public clientCompanyService: ClientCompanyService,  private route: ActivatedRoute, private router: Router) {
    this.active = false;
    this.isTaxiCompany = false;
    this.ownNetwork = false;
    this.synergy = false;
    this.idclientCompany = 0;
    this.clientCompany = new ClientCompany();
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idclientCompany = params['id_clientCompany'];
      });
      this.getClientCompany(this.idclientCompany);

  }

  getClientCompany(id: number) {
    if ( id > 0 ) {
      this.clientCompanyService.getClientCompany(id).subscribe(data => {
      console.log(data);
      this.clientCompany = JSON.parse(JSON.stringify(data[0]));
      if ( data[0]['locked']  === 'false') {
        this.active = true;
      } else {
        this.active = false;
      }
      // IsTaxiCompany
      if (  data[0]['isTaxiCompany'] === 'true' ) {
        this.isTaxiCompany = true;
      } else {
        this.isTaxiCompany = false;
      }
      // OwnNetwork
      if (  data[0]['ownNetwork'] === 'true') {
        this.ownNetwork = true;
      } else {
        this.ownNetwork = false;
      }
      // Synergy
      if (  data[0]['synergy'] === 'true' ) {
        this.synergy = true;
      } else {
        this.synergy = false;
      }
    });
    } else {
      this.clientCompany = new ClientCompany();
      this.clientCompany.id = 0;
    }
    // Get userCompanyIsClientCompany
    this.clientCompanyService.getClientCompany(id).subscribe(data => {
      console.log(data);
      this.userCompanyIsClientCompany = JSON.parse(JSON.stringify(data[0])).isTaxiCompany;
    });
  }

  saveClientCompany(clientCompany: ClientCompany) {
    // Active Rol
    if ( this.active ) {
      this.clientCompany.locked = 'false';
    } else {
      this.clientCompany.locked = 'true';
    }
    // IsTaxiCompany
    if ( this.isTaxiCompany ) {
      this.clientCompany.isTaxiCompany = 'true';
    } else {
      this.clientCompany.isTaxiCompany = 'false';
    }
    // OwnNetwork
    if ( this.ownNetwork ) {
      this.clientCompany.ownNetwork = 'true';
    } else {
      this.clientCompany.ownNetwork = 'false';
    }
    // Synergy
    if ( this.synergy ) {
      this.clientCompany.synergy = 'true';
    } else {
      this.clientCompany.synergy = 'false';
    }
    if ( this.clientCompany.id > 0 ) {
      // Update
      this.clientCompanyService.updateClientCompany(clientCompany).subscribe(data => {
        console.log(data);
      });
    } else {
      // Insert
      this.clientCompanyService.insertClientCompany(clientCompany).subscribe(data => {
        console.log(data);
      });
    }
    window.location.href = './empresasCliente';
  }
}
