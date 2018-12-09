import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormsModule} from '@angular/forms';

import { Rol } from '../model/rol.model';
import { Permission } from '../model/permission.model';

import { RolService } from '../rol/rol.service';


@Component({
  selector: 'app-rol-editar',
  templateUrl: './rol-editar.component.html',
  styleUrls: ['./rol-editar.component.css'],
})
export class RolEditarComponent implements OnInit {
  public sections = ['EmpresaTaxi', 'EmpresaCliente'];
  public rol: Rol;
  private sub: any;
  public idRol: number;
  public description: string;
  public activo: boolean;
  public permissions: Permission[];

  constructor(public rolService: RolService, private route: ActivatedRoute) {
    this.activo = false;
    this.idRol = 0;
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.idRol = params['id_rol'];
      });
    this.getRol(this.idRol);
    this.getAllPermissions(this.idRol);
  }

  onChangePermission(event, cat: any) { // Use appropriate model type instead of any
    for (let index = 0; index < this.permissions.length; index++) {
      if ( cat.id === this.permissions[index].id ) {
        if ( Number(this.permissions[index].state) === 0) {
          this.permissions[index].state = 1;
        } else {
          this.permissions[index].state = 0;
        }
        break;
      }
    }
  }

  getRol(id: number) {
    if ( id > 0 ) {
     this.rolService.getRol(id).subscribe(data => {
       console.log(data);
       this.rol = JSON.parse( JSON.stringify( data['objects'] ) )[0];
       if (this.rol.locked === 'false') {
        this.activo = true;
      }
     });
    } else {
      this.rol = new Rol();
      this.rol.id = 0;
    }
   }

   getAllPermissions(id: number) {
    this.rolService.getAllPermissions(id).subscribe(data => {
      console.log(data);
      this.permissions = JSON.parse( JSON.stringify( data['objects'] ) );
    });
  }

  saveRol(rol: Rol) {
    // List of permissions
    // tslint:disable-next-line:prefer-const
    let listIdPermisions: number[] = new Array()  ;

    for (let index = 0; index < this.permissions.length; index++) {
      if ( Number(this.permissions[index].state) === 1 ) {
        listIdPermisions.push(Number(this.permissions[index].id));
      }
    }
    // Active Rol
    if ( this.activo ) {
      this.rol.locked = 'false';
    } else {
      this.rol.locked = 'true';
    }
    if (this.rol.id > 0) {
      // Update
      this.rolService.updateRol( rol, listIdPermisions).subscribe(data => {
        console.log(data);
      });
    } else {
      // Insert
      this.rolService.insertRol( rol, listIdPermisions).subscribe(data => {
        console.log(data);
      });

    }
    window.location.href = './roles';
  }

  getChecked(id: string) {
    if (id === '0' ) {
      return false;
    } else {
      return true;
    }
  }
/*
  Actualizalocked(event) {
    if ( this.rol.locked === 'true') {
      this.rol.locked = 'false' ;
    } else {
      this.rol.locked = 'true' ;
    }
  }
*/
}
