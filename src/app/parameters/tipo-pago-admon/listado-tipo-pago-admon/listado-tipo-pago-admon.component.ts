import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { TipoPagoAdmonService } from 'src/app/services/tipos/tipo-pago-admon.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listado-tipo-pago-admon',
  templateUrl: './listado-tipo-pago-admon.component.html',
  styleUrls: ['./listado-tipo-pago-admon.component.scss']
})

export class ListadoTipoPagoAdmonComponent implements OnInit {
  items: any =[];

  constructor(private sharedService : SharedService,
              private tipoPagoAdmonService: TipoPagoAdmonService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
      this.tipoPagoAdmonService.obtenerListadoRegistros("/TipoPagoAdmon");
      this.tipoPagoAdmonService.listadoItems$.subscribe((data) => {
        this.items = data;
      });
    }

  editar(tarjeta: any) {
     this.tipoPagoAdmonService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoPagoAdmon', id).subscribe(data => {
                this.tipoPagoAdmonService.obtenerListadoRegistros("/TipoPagoAdmon");
                this.tipoPagoAdmonService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

}
