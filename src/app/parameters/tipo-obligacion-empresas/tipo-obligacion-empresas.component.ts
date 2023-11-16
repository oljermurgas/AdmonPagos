import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-obligacion-empresas',
  templateUrl: './tipo-obligacion-empresas.component.html',
  styleUrls: ['./tipo-obligacion-empresas.component.scss']
})


export class TipoObligacionEmpresaComponent implements OnInit {
  endPointRuta: string ='TipoObligacion';
  constructor() { }

  ngOnInit(): void {
  }

}
