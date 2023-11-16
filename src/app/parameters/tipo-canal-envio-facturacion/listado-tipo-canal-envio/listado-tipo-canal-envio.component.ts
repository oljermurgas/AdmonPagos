import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { CanalEnvioTipoService } from 'src/app/services/tipos/canal-envio-tipo.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listado-tipo-canal-envio',
  templateUrl: './listado-tipo-canal-envio.component.html',
  styleUrls: ['./listado-tipo-canal-envio.component.scss']
})

export class ListadoTipoCanalEnvioComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private canalEnvioTipoService: CanalEnvioTipoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.canalEnvioTipoService.obtenerListadoRegistros("/TipoCanalEnvioFactura");
      this.canalEnvioTipoService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.canalEnvioTipoService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoCanalEnvioFactura', id).subscribe(data => {
                this.canalEnvioTipoService.obtenerListadoRegistros("/TipoCanalEnvioFactura");
                this.canalEnvioTipoService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
