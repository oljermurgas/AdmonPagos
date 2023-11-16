import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import  { EmpresaSectorService } from 'src/app/services/tipos/empresa-sector.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listado-tipo-empresa-sector',
  templateUrl: './listado-tipo-empresa-sector.component.html',
  styleUrls: ['./listado-tipo-empresa-sector.component.scss']
})

export class ListadoTipoEmpresaSectorComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private empresaSectorService: EmpresaSectorService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.empresaSectorService.obtenerListadoRegistros("/TipoEmpresaSector");
      this.empresaSectorService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.empresaSectorService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoEmpresaSector', id).subscribe(data => {
                this.empresaSectorService.obtenerListadoRegistros("/TipoEmpresaSector");
                this.empresaSectorService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
