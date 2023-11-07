import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { SedeService } from 'src/app/services/shared/sedes/sede.services';


@Component({
  selector: 'app-sede-listado',
  templateUrl: './sede-listado.component.html',
  styleUrls: ['./sede-listado.component.scss']
})

export class SedesListadoComponent implements OnInit {
  @Input() endPoint: string='';
  items: any =[];

  constructor(private sharedService : SharedService,
              private sedeService: SedeService,
              private toastr: ToastrService) { }

              ngOnInit(): void {
                this.sedeService.obtenerListadoRegistros('/' + this.endPoint);
                this.sedeService.listadoData$.subscribe((data: any[]) => {
                  this.items = data;
                });
              }

              editar(tarjeta: any) {
                this.sedeService.editarRegistro(tarjeta);
                }

              eliminar(id: number){
                  if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
                        this.sharedService.del('Sede', id).subscribe(data => {
                            this.sedeService.obtenerListadoRegistros('/' + this.endPoint);
                            this.sedeService.obtenerDatosRegistroObservable$().subscribe((data) => {
                              this.items = data;
                            });
                            this.toastr.success('Mensaje','Registro Inactivo');
                    },
                    );
                  }
                }

}
