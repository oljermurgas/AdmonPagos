import { Component, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { AdmonPagosAdminService } from 'src/app/services/shared/services/admon-pagos-admin.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comp-listar',
  templateUrl: './comp-listar.component.html',
  styleUrls: ['./comp-listar.component.scss']
})

export class CompListarComponent  {
  @Input() endPoint: string='';
  items: any =[];

  constructor(private sharedService : SharedService,
              private admonPagosAdminService: AdmonPagosAdminService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.admonPagosAdminService.obtenerListadoRegistros('/' + this.endPoint);
      this.admonPagosAdminService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.admonPagosAdminService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del(this.endPoint, id).subscribe(data => {
                this.admonPagosAdminService.obtenerListadoRegistros('/' + this.endPoint);
                this.admonPagosAdminService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }
}
