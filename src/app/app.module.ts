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

import { RolComponent } from './rol/rol.component';
import { RolEditarComponent } from './rol-editar/rol-editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeEditarComponent } from './employee-editar/employee-editar.component';

const router: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'roles', component: RolComponent },
  { path: 'empleados', component: EmployeeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'rol-editar/:id_rol', component: RolEditarComponent },
  { path: 'empleado-editar/:id_empleado', component: EmployeeEditarComponent },
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
    EmployeeEditarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [LoginService, UserService, RolService, EmployeeService, FormsModule ],
  bootstrap: [AppComponent],
})
export class AppModule {

 }
