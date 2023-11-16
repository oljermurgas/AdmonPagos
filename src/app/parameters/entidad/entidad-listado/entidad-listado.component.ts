import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { SedeService } from 'src/app/services/shared/sedes/sede.services';
import { EntidadService } from 'src/app/services/shared/entidades/entidad.services';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-entidad-listado',
  templateUrl: './entidad-listado.component.html',
  styleUrls: ['./entidad-listado.component.scss']
})

export class EntidadListadoComponent implements OnInit {
  @Input() endPoint: string='';
  items: any =[];
  textoFiltro: string ='';
  itemsIniciales: any =[];
  formulario: FormGroup;
  tiposSeleccionados: string = '';

  constructor(private sharedService : SharedService,
              private entidadService: EntidadService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {

                this.formulario = this.formBuilder.group({
                  tipopagpadministracionid: [this.tiposSeleccionados],
                });
               }

              ngOnInit(): void {
                this.entidadService.obtenerListadoRegistros('/' + this.endPoint);
                this.entidadService.listadoData$.subscribe((data: any[]) => {
                  this.items = data;
                  this.itemsIniciales = this.items;
                });
              }

              editar(tarjeta: any) {
                this.entidadService.editarRegistro(tarjeta);
                }

              eliminar(id: number){
                  if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
                        this.sharedService.del('Entidad', id).subscribe(data => {
                            this.entidadService.obtenerListadoRegistros('/' + this.endPoint);
                            this.entidadService.obtenerDatosRegistroObservable$().subscribe((data) => {
                              this.items = data;
                            });
                            this.toastr.success('Mensaje','Registro Inactivo');
                    },
                    );
                  }
                }

                filtrarOpciones(event: Event) {
                  const termino = (event.target as HTMLInputElement).value;
                  this.textoFiltro = termino;
                  if (this.textoFiltro.length > 2)
                    this.actualizarListaConFiltro();
                  else
                    this.items = this.itemsIniciales;
                }


                actualizarListaConFiltro() {
                  if (this.itemsIniciales && this.textoFiltro !== null && this.textoFiltro !== undefined) {
                    this.items = this.itemsIniciales.filter((item: { nombre: string }) =>
                    item.nombre.toLowerCase().includes(this.textoFiltro.toLowerCase())
                  );  
                  } 
                }

}
