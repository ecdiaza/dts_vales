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
import { RolComponent } from './rol/rol.component';
import { RolService } from './rol/rol.service';
import { RolEditarComponent } from './rol-editar/rol-editar.component';

const router: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'roles', component: RolComponent },
  { path: 'rol-editar/:id_rol', component: RolEditarComponent },
  { path: '**', redirectTo: '/' }
  ];

 /*/{ path: '', redirectTo: '/cocina', pathMatch: 'full' },*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RolComponent,
    RolEditarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(router)
  ],
  providers: [LoginService, UserService, RolService ],
  bootstrap: [AppComponent],
})
export class AppModule {

 }
