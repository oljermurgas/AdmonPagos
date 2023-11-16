import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { SedeService } from 'src/app/services/shared/sedes/sede.services';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-sede-listado',
  templateUrl: './sede-listado.component.html',
  styleUrls: ['./sede-listado.component.scss']
})

export class SedesListadoComponent implements OnInit {
  @Input() endPoint: string='';
  items: any =[];
  formulario: FormGroup;
  tiposSeleccionados: string = '';
  itemsIniciales: any =[];
  textoFiltro: string ='';

  constructor(private sharedService : SharedService,
              private formBuilder: FormBuilder,
              private sedeService: SedeService,
              private toastr: ToastrService) { 

                this.formulario = this.formBuilder.group({
                  tipopagpadministracionid: [this.tiposSeleccionados],
                });
              }

              ngOnInit(): void {
                this.sedeService.obtenerListadoRegistros("/Sede");
                this.sedeService.listadoData$.subscribe((data: any[]) => {
                  this.items = data;
                  this.itemsIniciales = this.items;
                });
              }

              editar(tarjeta: any) {
                this.sedeService.editarRegistro(tarjeta);
                }

              eliminar(id: number){
                  if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
                        this.sharedService.del('Sede', id).subscribe(data => {
                            this.sedeService.obtenerListadoRegistros('/Sede');
                            this.sedeService.obtenerDatosRegistroObservable$().subscribe((data) => {
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
