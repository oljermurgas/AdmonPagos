import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { TipoVinculacionContractualService } from 'src/app/services/tipos/tipo-vinculacion-contractual.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-tipo-vinculacion-contractual',
  templateUrl: './listado-tipo-vinculacion-contractual.component.html',
  styleUrls: ['./listado-tipo-vinculacion-contractual.component.scss']
})

export class ListadoTipoVinculacionContractualComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private tipoVinculacionContractualService: TipoVinculacionContractualService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.tipoVinculacionContractualService.obtenerListadoRegistros("/TipoVinculacionContractual");
      this.tipoVinculacionContractualService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.tipoVinculacionContractualService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoVinculacionContractual', id).subscribe(data => {
                this.tipoVinculacionContractualService.obtenerListadoRegistros("/TipoVinculacionContractual");
                this.tipoVinculacionContractualService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
