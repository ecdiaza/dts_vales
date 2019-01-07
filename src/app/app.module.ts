import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { UserService} from './user/user.service';
import { LoginService} from './login/login.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { RolService } from './rol/rol.service';
import { EmployeeService } from './employee/employee.service';
import { AgreementService } from './agreement/agreement.service';

import { RolComponent } from './rol/rol.component';
import { RolEditarComponent } from './rol-editar/rol-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeEditarComponent } from './employee-editar/employee-editar.component';
import { ClientCompanyComponent } from './client-company/client-company.component';
import { ClientCompanyService } from './client-company/client-company.service';
import { ClientCompanyEditComponent } from './client-company-edit/client-company-edit.component';
import { AgreementComponent } from './agreement/agreement.component';
import { ValeComponent } from './vale/vale.component';
import { ValeEditarComponent } from './vale-editar/vale-editar.component';
import { ValeService } from './vale/vale.service';

const router: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'roles', component: RolComponent },
  { path: 'rol-editar/:id_rol', component: RolEditarComponent },
  { path: 'empleados', component: EmployeeComponent },
  { path: 'empleados/:id_empresa', component: EmployeeComponent },
  { path: 'empleado-editar/:id_empleado/:id_empresa', component: EmployeeEditarComponent },
  { path: 'empresasCliente', component: ClientCompanyComponent },
  { path: 'empresasCliente-editar/:id_clientCompany', component: ClientCompanyEditComponent },
  { path: 'convenio/:id_empresa', component: AgreementComponent },
  { path: 'vales', component: ValeComponent },
  { path: 'vale-editar', component: ValeEditarComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: '**', redirectTo: '/' }

  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RolComponent,
    RolEditarComponent,
    NavbarComponent,
    EmployeeComponent,
    EmployeeEditarComponent,
    ClientCompanyComponent,
    ClientCompanyEditComponent,
    AgreementComponent,
    ValeComponent,
    ValeEditarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [LoginService, UserService, RolService, EmployeeService, FormsModule, ClientCompanyService, AgreementService, ValeService ],
  bootstrap: [AppComponent],
})
export class AppModule {

 }
