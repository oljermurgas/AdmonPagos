import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-canal-envio-facturacion',
  templateUrl: './tipo-canal-envio-facturacion.component.html',
  styleUrls: ['./tipo-canal-envio-facturacion.component.scss']
})
export class TipoCanalEnvioFacturacionComponent implements OnInit {
  endPointRuta: string ='TipoCanalEnvioFactura';
  constructor() { }

  ngOnInit(): void {
  }

}
