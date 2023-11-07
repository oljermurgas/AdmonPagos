import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-pago-admon',
  templateUrl: './tipo-pago-admon.component.html',
  styleUrls: ['./tipo-pago-admon.component.scss']
})
export class TipoPagoAdmonComponent implements OnInit {
  endPointRuta: string ='TipoPagoAdmon';
  constructor() { }

  ngOnInit(): void {
  }

}
