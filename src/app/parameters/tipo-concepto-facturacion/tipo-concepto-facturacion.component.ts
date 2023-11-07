import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-concepto-facturacion',
  templateUrl: './tipo-concepto-facturacion.component.html',
  styleUrls: ['./tipo-concepto-facturacion.component.scss']
})
export class TipoConceptoFacturacionComponent implements OnInit {
  endPointRuta: string ='TipoConceptoFacturacion';
  constructor() { }

  ngOnInit(): void {
  }

}
