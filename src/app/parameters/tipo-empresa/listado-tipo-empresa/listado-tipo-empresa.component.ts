import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { TipoEmpresaService } from 'src/app/services/tipo-empresa.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listado-tipo-empresa',
  templateUrl: './listado-tipo-empresa.component.html',
  styleUrls: ['./listado-tipo-empresa.component.scss']
})

export class ListadoTipoEmpresaComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private tipoEmpresaService: TipoEmpresaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.tipoEmpresaService.obtenerListadoRegistros("/TipoEmpresa");
      this.tipoEmpresaService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.tipoEmpresaService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoEmpresa', id).subscribe(data => {
                this.tipoEmpresaService.obtenerListadoRegistros("/TipoEmpresa");
                this.tipoEmpresaService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
