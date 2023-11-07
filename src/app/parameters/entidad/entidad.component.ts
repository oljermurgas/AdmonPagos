import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.scss']
})
export class EntidadComponent {
  endPointRuta: string ='Entidad';
  items: any =[];

  constructor() { }

  ngOnInit(): void {
    }


}

