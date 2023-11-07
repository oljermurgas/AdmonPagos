import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { TipoEmpresaService } from 'src/app/services/tipo-empresa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-tipo-empresa-nivel',
  templateUrl: './listado-tipo-empresa-nivel.component.html',
  styleUrls: ['./listado-tipo-empresa-nivel.component.scss']
})
export class ListadoTipoEmpresaNivelComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private tipoEmpresaService: TipoEmpresaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.tipoEmpresaService.obtenerListadoRegistros("/TipoEmpresaNivel");
      this.tipoEmpresaService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.tipoEmpresaService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoEmpresaNivel', id).subscribe(data => {
                this.tipoEmpresaService.obtenerListadoRegistros("/TipoEmpresaNivel");
                this.tipoEmpresaService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
