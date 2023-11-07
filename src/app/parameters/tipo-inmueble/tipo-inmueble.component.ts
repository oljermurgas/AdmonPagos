import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-inmueble',
  templateUrl: './tipo-inmueble.component.html',
  styleUrls: ['./tipo-inmueble.component.scss']
})
export class TipoInmuebleComponent implements OnInit {
   endPointRuta: string ='TipoInmueble';

  constructor() { }
  ngOnInit(): void {
  }

}
