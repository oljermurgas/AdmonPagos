import { Component, Input, OnInit , ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
// import { BibliotecaService } from '../../../shared/services/biblioteca.service';
// import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-banner-buscador',
  templateUrl: './banner-buscador.component.html',
  styleUrls: ['./banner-buscador.component.scss']
})
export class BannerBuscadorComponent implements OnInit {
  textoBusqueda: string = '';
  error: string = '';
  pagina = 1;
  habilitarBusquedaEnterBoton: number =0;

  constructor( 
    // private bibliotecaService: BibliotecaService, 
    // private sharedService : SharedService 
    ) {
    // this.sharedService.gethabilitarBusquedaEnterBoton().subscribe(nuevoValor => {
    //   this.habilitarBusquedaEnterBoton = nuevoValor; // Actualizar el valor en el componente
    //   this.textoBusqueda = (nuevoValor== 0) ? "" : this.textoBusqueda;
    //   console.log("nuevoValor ", nuevoValor, " this.textoBusqueda", this.textoBusqueda);
    // });

   }

  ngOnInit(): void { }
      onSearchInputChange(): void {
        if (this.realizarbusqueda() && this.habilitarBusquedaEnterBoton!=0) {
          // this.buscarDatos(this.pagina, this.textoBusqueda);
        }
      }

      realizarbusqueda(): boolean {
        return this.textoBusqueda.length > 1;
      }
    
      buscarBotonBuscador(): void {
        // if (this.realizarbusqueda() && this.textoBusqueda.length>1) {
        //   this.sharedService.sethabilitarBusquedaEnterBoton(1);
        //   this.buscarDatos(this.pagina, this.textoBusqueda);
        // }
      }
    
      limpiarBotonEquis(): void {
        this.textoBusqueda = '';
      }
  
      // onEnterKey(event: KeyboardEvent) {
      //   event.preventDefault();
      //   console.log("event", event);
        
      //   if (event.key === 'Enter' && this.textoBusqueda.length > 1) {
      //     // Realizar acciones cuando se presiona Enter y el texto de búsqueda es válido
      //   }
      // }
      

  //     buscarDatos( page: number, searchText: string ) {
  //       this.sharedService.setSharedVariable(searchText);
  //       this.bibliotecaService.buscarDatos(page, searchText).subscribe((results) => {
  //       });
  //     }
}
