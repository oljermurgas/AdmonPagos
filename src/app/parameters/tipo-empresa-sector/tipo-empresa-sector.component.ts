import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-empresa-sector',
  templateUrl: './tipo-empresa-sector.component.html',
  styleUrls: ['./tipo-empresa-sector.component.scss']
})
export class TipoEmpresaSectorComponent implements OnInit {
  endPointRuta: string ='TipoEmpresaSector';
  constructor() { }

  ngOnInit(): void {
  }

}
