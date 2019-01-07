import { Component, OnInit } from '@angular/core';

import { Vale } from '../model/vale.model';
import { ValeService } from '../vale/vale.service';

@Component({
  selector: 'app-vale',
  templateUrl: './vale.component.html',
  styleUrls: ['./vale.component.css']
})
export class ValeComponent implements OnInit {

  public listVales: Vale[];

  constructor(private valeService: ValeService ) { }

  ngOnInit() {
    this.getListVales();
  }

  getListVales() {
    this.valeService.getVales().subscribe(data => {
      console.log(data);
      this.listVales = JSON.parse(JSON.stringify(data));
    });
  }
}
