import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { CoordinadorPgnService } from 'src/app/services/tipos/coordinador-pgn.services';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-coordinacion-pgn-listado',
  templateUrl: './coordinacion-pgn-listado.component.html',
  styleUrls: ['./coordinacion-pgn-listado.component.scss']
})

export class CoordinacionPgnListadoComponent implements OnInit {
  @Input() endPoint: string='';
  items: any =[];
  textoFiltro: string ='';
  itemsIniciales: any =[];
  formulario: FormGroup;
  tiposSeleccionados: string = '';

  constructor(private sharedService : SharedService,
              private coordinadorPgnService: CoordinadorPgnService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) {

                this.formulario = this.formBuilder.group({
                  tipopagpadministracionid: [this.tiposSeleccionados],
                });
               }

              ngOnInit(): void {
                this.coordinadorPgnService.obtenerListadoRegistros('/Coordinadors');
                this.coordinadorPgnService.listadoItems$.subscribe((data: any[]) => {
                  this.items = data;
                  this.itemsIniciales = this.items;
                });
              }

              editar(tarjeta: any) {
                this.coordinadorPgnService.editarRegistro(tarjeta);
                }

              eliminar(id: number){
                  if (confirm('Esta seguro que desea borrar el registro' + id + " ?")) {
                        this.sharedService.del('Coordinacion', id).subscribe(data => {
                            this.coordinadorPgnService.obtenerListadoRegistros('/' + this.endPoint);
                            this.coordinadorPgnService.obtenerDatosRegistroObservable$().subscribe((data) => {
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
