import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-tarifa',
  templateUrl: './tipo-tarifa.component.html',
  styleUrls: ['./tipo-tarifa.component.scss']
})
export class TipoTarifaComponent implements OnInit {
  endPointRuta: string ='TipoTarifa';
  constructor() { }

  ngOnInit(): void {
  }

}
