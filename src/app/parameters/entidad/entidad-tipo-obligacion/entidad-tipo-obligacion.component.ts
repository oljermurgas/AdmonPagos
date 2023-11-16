import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { EntidadObligacionesService } from 'src/app/services/shared/entidades/entidad-obligaciones.services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entidad-tipo-obligacion',
  templateUrl: './entidad-tipo-obligacion.component.html',
  styleUrls: ['./entidad-tipo-obligacion.component.scss']
})
export class EntidadTipoObligacionComponent implements OnInit {
  @Input() endPoint: string='';
  @Output() datoEnviadoTipoObligacion = new EventEmitter<any>();
  items: any =[];

  constructor(private sharedService : SharedService,
              private entidadObligacionesService: EntidadObligacionesService,
              private toastr: ToastrService) { }

              ngOnInit(): void {
                if (parseInt(this.endPoint) > 0) {
                  console.log(" this.endPoint :"), this.endPoint;
                  this.entidadObligacionesService.obtenerListadoRegistrosPorEntidad(parseInt(this.endPoint));
                }  
               
                this.entidadObligacionesService.listadoData$.subscribe((data: any[]) => {
                  this.items = data;
                });
              }

              editar(tarjeta: any) {
                this.entidadObligacionesService.editarRegistro(tarjeta);
                this.datoEnviadoTipoObligacion.emit(tarjeta);
                console.log("tarjeta : ", tarjeta);
                }

              eliminar(id: number){
                  if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
                        this.sharedService.del('EntidadTipoObligacion', id).subscribe(data => {
                          if (parseInt(this.endPoint) > 0) {
                            this.entidadObligacionesService.obtenerListadoRegistrosPorEntidad(parseInt(this.endPoint));
                            this.entidadObligacionesService.obtenerDatosRegistroObservable$().subscribe((data) => {
                              this.items = data;
                            });
                            this.toastr.success('Mensaje','Registro Inactivo');
                          }     
                    },
                    );
                  }
                }

}
