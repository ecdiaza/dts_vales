import { Component, OnDestroy, OnInit } from '@angular/core';
import { Rol } from '../model/rol.model';
import {RolService} from '../rol/rol.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-rol-editar',
  templateUrl: './rol-editar.component.html',
  styleUrls: ['./rol-editar.component.css']
})
export class RolEditarComponent implements OnInit {
  public sections = ['EmpresaTaxi', 'EmpresaCliente'];
  public rol: Rol;
  private sub: any;
  public id_rol: number;
  public description: string;
  public activo: boolean;

  constructor(public rolService: RolService, private route: ActivatedRoute) { 
    this.activo = false;
    this.id_rol = 0;
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id_rol = params['id_rol'];
      if (this.rol.isActive === 'Si') {
        this.activo = true;
      }
      });

    this.getRol(this.id_rol);

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getRol(id: number) {
     this.rolService.getRol(id).subscribe(data => {
       console.log(data);
       this.rol = JSON.parse( JSON.stringify( data['objects'] ) )[0];
     });
   }

}
