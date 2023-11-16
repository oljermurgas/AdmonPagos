import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { EmpresaTipoService } from 'src/app/services/tipos/empresa-tipo.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listado-tipo-empresa',
  templateUrl: './listado-tipo-empresa.component.html',
  styleUrls: ['./listado-tipo-empresa.component.scss']
})

export class ListadoTipoEmpresaComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private empresaTipoService: EmpresaTipoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.empresaTipoService.obtenerListadoRegistros("/TipoEmpresa");
      this.empresaTipoService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.empresaTipoService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoEmpresa', id).subscribe(data => {
                this.empresaTipoService.obtenerListadoRegistros("/TipoEmpresa");
                this.empresaTipoService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
