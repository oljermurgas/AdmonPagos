import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { EmpresaNivelService } from 'src/app/services/tipos/empresa-nivel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-tipo-empresa-nivel',
  templateUrl: './listado-tipo-empresa-nivel.component.html',
  styleUrls: ['./listado-tipo-empresa-nivel.component.scss']
})
export class ListadoTipoEmpresaNivelComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private empresaNivelService: EmpresaNivelService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.empresaNivelService.obtenerListadoRegistros("/TipoEmpresaNivel");
      this.empresaNivelService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.empresaNivelService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoEmpresaNivel', id).subscribe(data => {
                this.empresaNivelService.obtenerListadoRegistros("/TipoEmpresaNivel");
                this.empresaNivelService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
