import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { EmpresaTipoTarifaService } from 'src/app/services/tipos/empresa-tipo-tarifa.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listado-tipo-tarifa',
  templateUrl: './listado-tipo-tarifa.component.html',
  styleUrls: ['./listado-tipo-tarifa.component.scss']
})

export class ListadoTipoTarifaComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private empresaTipoTarifaService: EmpresaTipoTarifaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.empresaTipoTarifaService.obtenerListadoRegistros("/TipoTarifa");
      this.empresaTipoTarifaService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.empresaTipoTarifaService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoTarifa', id).subscribe(data => {
                this.empresaTipoTarifaService.obtenerListadoRegistros("/TipoTarifa");
                this.empresaTipoTarifaService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
