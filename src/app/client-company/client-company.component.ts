import { Component, OnInit } from '@angular/core';
import { ClientCompany } from '../model/client-company.model';
import { ClientCompanyService } from './client-company.service';

@Component({
  selector: 'app-client-company',
  templateUrl: './client-company.component.html',
  styleUrls: ['./client-company.component.css']
})
export class ClientCompanyComponent implements OnInit {
  public clientCompanies: ClientCompany[];
  // Pagination
  public clientCompaniesPage: ClientCompany[];
  public currentPage: number;
  public pages: number[];
  public total: number;
  public numPages: number;
  public pageSize: number;
  //
  constructor(public clientCompanyService: ClientCompanyService) {
    this.clientCompanies = new Array();
    // Pagination
    this.currentPage = 1;
    this.pages = new Array();
    this.pageSize = 5;
  }



  ngOnInit() {
    this.getClientCompanies();
  }

  setPage(index: number) {
    this.currentPage = index;
    this.clientCompaniesPage = new Array();
    for (let i = (index - 1) * this.pageSize; ( i < index * this.pageSize ) && ( i < this.total ); i++) {
      this.clientCompaniesPage.push(this.clientCompanies[i]);
    }
  }

  deleteClientCompany(id: number) {
    this.clientCompanyService.deleteClientCompany(id).subscribe(data => {
      console.log(data);
    });
    window.location.href = './empresasCliente';
  }

  getClientCompanies() {
      this.clientCompanyService.getClientCompanies().subscribe(data => {
      console.log(data);
      this.clientCompanies = JSON.parse(JSON.stringify(data));
      // Pagination
      this.total = this.clientCompanies.length;
      this.numPages = this.total / this.pageSize;
      for (let i = 0; i < this.numPages; i++) {
       this.pages.push(i + 1);
      }
      this.setPage(1);
    });
  }
}
