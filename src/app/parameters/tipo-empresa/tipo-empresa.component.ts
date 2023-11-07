import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-empresa',
  templateUrl: './tipo-empresa.component.html',
  styleUrls: ['./tipo-empresa.component.scss']
})
export class TipoEmpresaComponent implements OnInit {
  results: any;
  totalRegistros: number = 0;

  constructor() { }

  ngOnInit(): void {
    
  }

}
