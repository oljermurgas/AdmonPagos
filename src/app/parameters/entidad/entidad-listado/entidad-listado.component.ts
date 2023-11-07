import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { SedeService } from 'src/app/services/shared/sedes/sede.services';
import { EntidadService } from 'src/app/services/shared/entidades/entidad.services';


@Component({
  selector: 'app-entidad-listado',
  templateUrl: './entidad-listado.component.html',
  styleUrls: ['./entidad-listado.component.scss']
})

export class EntidadListadoComponent implements OnInit {
  @Input() endPoint: string='';
  items: any =[];

  constructor(private sharedService : SharedService,
              private entidadService: EntidadService,
              private toastr: ToastrService) { }

              ngOnInit(): void {
                this.entidadService.obtenerListadoRegistros('/' + this.endPoint);
                this.entidadService.listadoData$.subscribe((data: any[]) => {
                  this.items = data;
                });
              }

              editar(tarjeta: any) {
                this.entidadService.editarRegistro(tarjeta);
                }

              eliminar(id: number){
                  if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
                        this.sharedService.del('Sede', id).subscribe(data => {
                            this.entidadService.obtenerListadoRegistros('/' + this.endPoint);
                            this.entidadService.obtenerDatosRegistroObservable$().subscribe((data) => {
                              this.items = data;
                            });
                            this.toastr.success('Mensaje','Registro Inactivo');
                    },
                    );
                  }
                }

}
