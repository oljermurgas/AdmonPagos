import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  constructor() { }

  todoList=[{
  parametro: "Color",
  valor: "",
  pProductoTipoPropiedadId:0
  },
  {
  parametro: "Referencia:",
  valor:  "",
  pProductoTipoPropiedadId:1
  },
  {
  parametro: "Mayorista:",
  valor:  "",
  pProductoTipoPropiedadId:2
  },
  {
  parametro: "Minorista:",
  valor: "",
  pProductoTipoPropiedadId:1
  },
  {
  parametro: "Talla",
  valor:  "",
  pProductoTipoPropiedadId:0
  }];

  getmyData(){
  return this.todoList;
  }
  
  setMyData(data: any){
  this.todoList=[data];
  }
}
