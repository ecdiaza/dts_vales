import { Component, OnInit } from '@angular/core';
import {RolService} from './rol.service';
import {Rol} from '../model/rol.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  public roles: Rol[];
  constructor( public rolService: RolService) {

  }


  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
      this.rolService.getRoles().subscribe(data => {
      console.log(data);
      this.roles = JSON.parse( JSON.stringify( data['objects'] ) );
      let a: number;
      a = 1;
    });
  }

}
