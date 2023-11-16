import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { InmuebleTipoService } from 'src/app/services/tipos/inmueble-tipo.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listado-tipo-inmueble',
  templateUrl: './listado-tipo-inmueble.component.html',
  styleUrls: ['./listado-tipo-inmueble.component.scss']
})

export class ListadoTipoInmuebleComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private inmuebleTipoService: InmuebleTipoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.inmuebleTipoService.obtenerListadoRegistros("/TipoInmueble");
      this.inmuebleTipoService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.inmuebleTipoService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoInmueble', id).subscribe(data => {
                this.inmuebleTipoService.obtenerListadoRegistros("/TipoInmueble");
                this.inmuebleTipoService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
