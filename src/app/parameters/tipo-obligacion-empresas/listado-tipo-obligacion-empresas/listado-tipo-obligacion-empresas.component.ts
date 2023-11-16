import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { EmpresaTipoObligacionService } from 'src/app/services/tipos/empresa-tipo-obligacion.service';
import { TipoPagoAdmonService } from 'src/app/services/tipos/tipo-pago-admon.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listado-tipo-obligacion-empresas',
  templateUrl: './listado-tipo-obligacion-empresas.component.html',
  styleUrls: ['./listado-tipo-obligacion-empresas.component.scss']
})

export class ListadoTipoObligacionEmpresasComponent implements OnInit {
  items: any =[];
  itemsIniciales: any =[];
  tiposPagoAdministracion: any[] = [];

  formulario: FormGroup;
  tiposSeleccionados: number = 0;

  constructor(private sharedService : SharedService,
              private formBuilder: FormBuilder,
              private tipoPagoAdmonService: TipoPagoAdmonService,
              private empresaTipoObligacionService: EmpresaTipoObligacionService,
              private toastr: ToastrService) {

                this.formulario = this.formBuilder.group({
                  tipopagpadministracionid: [this.tiposSeleccionados],
                });

                this.formulario.get('tipopagpadministracionid')?.valueChanges.subscribe((valor: number) => {
                  this.tiposSeleccionados = valor;
                  this.actualizarListaConFiltro();
                });

               }

  ngOnInit(): void {
      this.empresaTipoObligacionService.obtenerListadoRegistros("/TipoObligacion");
      this.empresaTipoObligacionService.listadoItems$.subscribe((data) => {
        this.items = data;
        this.itemsIniciales = this.items;
      });

      this.tipoPagoAdmonService.obtenerListadoRegistros('/TipoPagoAdmon');
      this.tipoPagoAdmonService.listadoItems$.subscribe((data) => {
        this.tiposPagoAdministracion = data.map(item => ({
          id: item.id,
          descripcion: item.descripcion
        }));
      });

    }

  editar(tarjeta: any) {
     this.empresaTipoObligacionService.editarRegistro(tarjeta);
    }

  eliminar(id: number){
      if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
            this.sharedService.del('TipoObligacion', id).subscribe(data => {
                this.empresaTipoObligacionService.obtenerListadoRegistros("/TipoObligacion");
                this.empresaTipoObligacionService.listadoItems$.subscribe((data) => {
                  this.items = data;
                });
                this.toastr.success('Mensaje','Registro Inactivo');
         },
         );
      }
    }

  actualizarListaConFiltro() {
    if (this.itemsIniciales && this.tiposSeleccionados !== null && this.tiposSeleccionados !== undefined) {
      if (this.tiposSeleccionados!= 0)
        this.items = this.itemsIniciales.filter((item: {tipoPagoAdmonId: number }) => item.tipoPagoAdmonId == this.tiposSeleccionados);
      else
        this.items = this.itemsIniciales;
    } 
  }
  
}
